const Book = require("../models/Book");
const emailService = require("../services/email");
const { emailType } = require("../helpers");

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
    userId: id
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
      bookings.userId === _id;
      totalBookings.unshift(bookings);
    }
  }
  return totalBookings;
};

const changeState = async (bookingId, state) => {
  const books = await Book.find();
  const service = await books.map(async book => {
    const service = await book.bookings.find(
      service => service._id.toString() === bookingId
    );
    service.state = state;
    book.save();
    return service;
  });
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
    details,
    url: userUrl,
    buttonText,
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
    url: artistUrl
  } = await emailService.content(
    type.artist,
    uri,
    null,
    artistFirstName,
    reviewData
  );
  const resUser = await emailService.compose(
    userEmail,
    userSubject,
    title,
    userHtml,
    details,
    userUrl,
    buttonText,
    templateId
  );
  const resArtist = await emailService.compose(
    artistEmail,
    artistSubject,
    title,
    artistHtml,
    details,
    artistUrl,
    buttonText,
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

module.exports = {
  create,
  getById,
  getByField,
  createBooking,
  getUserBookings,
  changeState,
  sendEmail,
  complete
};
