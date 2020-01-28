const User = require("../models/User");
const Book = require("../models/Book");

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

module.exports = { create, getById };
