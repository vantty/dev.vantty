const User = require("../models/User");
const Book = require("../models/Book");

const create = async userId => {
  const newBook = new Book({
    user: userId
  });
  const book = await newBook.save();
  return book;
};

module.exports = { create };
