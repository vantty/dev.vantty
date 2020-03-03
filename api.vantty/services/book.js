const Book = require("../models/Book");
const emailService = require("../services/email");
const { emailType, cancelPolicy } = require("../helpers");

const create = async userId => {
  const newBook = new Book({
    user: userId
  });
  const book = await newBook.save();
  return book;
};

const getById = async id => {
  const book = await Book.findById(id);
  return book;
};

const getByField = async field => {
  const book = await Book.findOne(field);
  return book;
};

const createBooking = async (bookId, user, fields) => {
  const { id, firstName } = user;
  const book = await getById(bookId);
  const newBook = {
    ...fields,
    name: firstName,
    userId: id,
    bookId: bookId
  };
  book.bookings.unshift(newBook);
  if (user.bookings.length < 1) {
    user.bookings.unshift(bookId);
  }
  const service = user.bookings.find(service => service == bookId);
  if (!service) {
    user.bookings.unshift(bookId);
  }
  await user.save();
  await book.save();
  return book;
};

const getUserBookings = async user => {
  const { _id, bookings } = user;
  let totalBookings = [];
  for (let book of bookings) {
    const profileBook = await getById(book);
    for (let bookings of profileBook.bookings) {
      if (bookings.userId === _id.toString()) {
        totalBookings.push(bookings);
      }
    }
  }
  totalBookings.sort(
    (a, b) => parseFloat(b.requestTimeStamp) - parseFloat(a.requestTimeStamp)
  );
  return totalBookings;
};

const changeState = async (bookingId, bookId, state) => {
  const book = await Book.findById(bookId);
  const service = await book.bookings.find(
    service => service._id.toString() === bookingId
  );
  service.state = state;
  if (state === "declined-user") {
    const { policy, fee, cancelDate, cancelTimeStamp } = await cancelPolicy(
      state,
      service.appointmentTimeStamp
    );
    service.cancelDate = cancelDate;
    service.cancelTimeStamp = cancelTimeStamp;
    service.cancelPolicy = policy;
    service.cancelFee = fee;
  }
  book.save();
  return service;
};

const sendEmail = async (
  user,
  artist,
  uri,
  state,
  bookCode,
  posponeText,
  reviewId,
  date
) => {
  const { firstName: userFirstName, email: userEmail } = user;
  const {
    firstName: artistFirstName,
    email: artistEmail,
    id: artistId
  } = artist;
  const type = await emailType(state);
  const info = state === "accepted" ? bookCode : posponeText;
  const reviewData = state === "completed" ? { artistId, reviewId } : null;
  const {
    subject: userSubject,
    title,
    html: userHtml,
    html2: userHtml2,
    details: userDatails,
    url: userUrl,
    buttonText: userButtonText,
    templateId
  } = await emailService.content(
    type.user,
    uri,
    info,
    userFirstName,
    reviewData,
    date
  );
  const {
    subject: artistSubject,
    html: artistHtml,
    html2: artistHtml2,
    details: artstDetails,
    url: artistUrl,
    buttonText: artistButtonText
  } = await emailService.content(
    type.artist,
    uri,
    info,
    artistFirstName,
    reviewData,
    date
  );
  const resUser = await emailService.compose(
    userEmail,
    userSubject,
    title,
    userHtml,
    userHtml2,
    userDatails,
    userUrl,
    userButtonText,
    templateId
  );
  const resArtist = await emailService.compose(
    artistEmail,
    artistSubject,
    title,
    artistHtml,
    artistHtml2,
    artstDetails,
    artistUrl,
    artistButtonText,
    templateId
  );
  if (resUser === resArtist) {
    return resUser;
  }
};

const complete = async (artistId, bookCode, state) => {
  const book = await getByField({ user: artistId });
  const service = book.bookings.find(service => service.bookCode === bookCode);
  service.state = state;
  await book.save();
  return service;
};

const updateCharge = async (artistId, bookCode, status) => {
  const book = await getByField({ user: artistId });
  const service = book.bookings.find(service => service.bookCode === bookCode);
  service.chargeStatus = status;
  await book.save();
  return service;
};

module.exports = {
  create,
  getById,
  getByField,
  createBooking,
  getUserBookings,
  changeState,
  sendEmail,
  complete,
  updateCharge
};
