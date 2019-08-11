const User = require("../models/User");

exports.allUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};
