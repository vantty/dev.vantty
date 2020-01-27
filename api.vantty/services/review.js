const User = require("../models/User");
const Review = require("../models/Review");
const serviceUser = require("../services/user");

const create = async userId => {
  const newReview = new Review({
    user: userId
  });
  const review = await newReview.save();
  return review;
};

const getById = async id => {
  const review = await Review.findById(id);

  return review;
};

const deleteReview = async id => {
  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ msg: "Review not found" });
  }

  // Check user
  if (review.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not authorized" });
  }

  await review.remove();
};

//Comments

const createComment = async (reviewId, user, fields) => {
  const {
    id: userId,
    profileImage: { original },
    firstName
  } = user;
  const review = await getById(reviewId);

  const newComment = {
    ...fields,
    name: firstName,
    profilePicture: original,
    user: userId
  };

  review.comments.unshift(newComment);

  await review.save();

  return review.comments;
};

const deleteComment = async (review, commentId) => {
  // Get remove index
  const removeIndex = review.comments
    .map(comment => comment.id)
    .indexOf(commentId);

  review.comments.splice(removeIndex, 1);

  await review.save();

  return review.comments;
};

module.exports = {
  create,
  getById,
  deleteReview,
  createComment,
  deleteComment
};
