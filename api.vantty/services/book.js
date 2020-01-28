const User = require("../models/User");
const Book = require("../models/Book");
const serviceUser = require("../services/user");

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

const createBooking = async (bookId, user, fields) => {
  const { id, firstName } = user;
  const book = await getById(bookId);
  const newBook = {
    ...fields,
    name: firstName,
    userId: id
  };
  book.bookings.unshift(newBook);

  //Add Book id to the User Model
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

module.exports = { create, getById, createBooking, getUserBookings };
