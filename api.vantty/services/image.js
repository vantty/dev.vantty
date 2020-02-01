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

const getByImagesId = async id => {
  const images = await Image.findOne({
    _id: id
  });
  return images;
};

const save = async (userId, newImages) => {
  const images = await getById(userId);
  for (let i = 0; i < newImages.length; i++) {
    const imgObj = {
      original: newImages[i].eager[0].url,
      cloudId: newImages[i].public_id
    };
    await images.pictures.unshift(imgObj);
  }
  await images.save();
  return images;
};

const remove = async (id, imageId) => {
  const images = await getById(id);
  const index = await images.pictures
    .map(picture => picture.id)
    .indexOf(imageId);
  await images.pictures.splice(index, 1);
  await images.save();
  return images;
};

const saveTags = async (id, tags) => {
  const images = await getById(id);
  images.pictures.map(pic => {
    tags.map(tag => {
      if (pic._id == tag._id) {
        pic.tag = tag.tag;
      }
    });
  });
  await images.save();
  return images;
};

module.exports = {
  create,
  getById,
  save,
  remove,
  saveTags,
  getByImagesId
};
