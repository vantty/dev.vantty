const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const reviewService = require("../services/review");
const imageService = require("../services/image");
const bookService = require("../services/book");

const getById = async id => {
  const profile = await Profile.findOne({
    user: id
  });
  return profile;
};

const getAll = async () => {
  const profiles = await Profile.find();
  return profiles;
};

const create = async (id, fields) => {
  // Create Review Id
  const { _id: reviewId } = await reviewService.create(id);
  // Create Images id
  const { _id: imagesId } = await imageService.create(id);
  // Create Images id
  const { _id: bookId } = await bookService.create(id);

  const newProfile = {
    ...fields,
    user: id,
    reviewId: reviewId,
    imagesId: imagesId,
    bookId: bookId
  };
  const profile = await new Profile(newProfile);
  await profile.save();
  return profile;
};

const update = async (id, field, method) => {
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { [method]: field },
    { new: true }
  );
  return profile;
};

const deleteDb = async (id, field, method) => {
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { [method]: field },
    { multi: true }
  );

  return profile;
};

module.exports = { getById, getAll, update, deleteDb, create };
