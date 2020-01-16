const Image = require("../models/Image");

const create = async userId => {
  const newImages = new Image({
    user: userId
  });
  const image = await newImages.save();
  return image;
};

const getById = async id => {
  const images = await Image.findOne({
    user: id
  });
  return images;
};

const save = async (userId, newImage) => {
  const images = await getByUser(userId);
  await images.pictures.unshift(newImage);
  await images.save();
  return images;
};

module.exports = { create, getById, save };
