const Review = require("../models/Review");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { getStrategy } = require("../helpers/getStrategy");
// @desc     Create a review
exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newReview = new Review({
      user: req.user.id
    });

    const review = await newReview.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc     Get all review
exports.allReviews = async (req, res) => {
  try {
    const review = await Review.find().sort({ date: -1 });
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc     Get review by ID
exports.reviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc     Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Check user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await review.remove();

    res.json({ msg: "Review removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};

//=====================
// Vantty comments routes
//=====================

// @desc     Comment on a reviews
exports.commentReview = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const review = await Review.findById(req.params.id);

    var method = user.method;
    const newComment = {
      rating: req.body.rating,
      text: req.body.text,
      name: user[method].firstName,
      profilePicture: user[method].profilePicture.original,
      user: req.user.id
    };
    review.comments.unshift(newComment);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc     Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const user = await User.findById(req.user.id);
    const Admin = await User.findById(req.user.id);
    console.log(user);
    console.log("Parama", req.params);
    // Pull out comment
    const comment = review.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (user.role !== "Admin") {
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
    }

    // Get remove index
    const removeIndex = review.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    review.comments.splice(removeIndex, 1);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
