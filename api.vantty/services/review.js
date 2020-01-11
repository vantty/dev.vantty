const User = require("../models/User");
const Review = require("../models/Review");

const create = async userId => {
  const newReview = new Review({
    user: userId
  });

  const review = await newReview.save();

  return review;
};

module.exports = { create };
