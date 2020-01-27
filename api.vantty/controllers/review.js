const Review = require("../models/Review");
const serviceReview = require("../services/review");

//Create a review
exports.create = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const review = await serviceReview.create(id);
    res.status(200).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// //Get all review
// exports.allReviews = async (req, res) => {
//   try {
//     const review = await Review.find().sort({ date: -1 });
//     res.json(review);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// Get review by ID
exports.getById = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const review = await serviceReview.getById(id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//=====================
// Vantty comments routes
//=====================

// @desc     Comment on a reviews
exports.createComment = async (req, res) => {
  try {
    const {
      user,
      params: { id: reviewId },
      body: fields
    } = req;

    const comments = await serviceReview.createComment(reviewId, user, fields);

    res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc     Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const {
      user: { role, id },
      params: { id: reviewId, comment_id }
    } = req;

    const review = await serviceReview.getById(reviewId);

    // Pull out comment
    const comment = review.comments.find(comment => comment.id === comment_id);
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (role !== "Admin") {
      if (comment.user.toString() !== id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
    }

    const comments = await serviceReview.deleteComment(review, comment_id);

    // res.json(review.comments);
    res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
