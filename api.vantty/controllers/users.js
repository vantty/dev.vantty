const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");

exports.allUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// DELETE profile
exports.deleteAccount = async (req, res) => {
  try {
    // Remove user review
    await Review.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 1");
  }
};
