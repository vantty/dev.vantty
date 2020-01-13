const User = require("../models/User");
const Image = require("../models/Image");

const create = async userId => {
  const newImages = new Image({
    user: userId
  });
  const image = await newImages.save();
  return image;
};

module.exports = { create };
