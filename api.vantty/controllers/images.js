const cloudinary = require("cloudinary");
const imageService = require("../services/image");
const userService = require("../services/user");
const profileService = require("../services/profile");
const cloudinaryService = require("../services/cloudinary");
const { profileImageObject } = require("../helpers");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getByUser = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const { pictures: result } = await imageService.getById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getById = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const { pictures: result } = await imageService.getById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.save = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const files = Object.values(req.files);
    const cloudImages = await cloudinaryService.save(files);
    const images = await Promise.all(cloudImages);
    const result = await imageService.save(id, images);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.saveProfileImage = async (req, res) => {
  try {
    const {
      user: { id, profile },
      params: { remove_cloud_id: removeCloudId }
    } = req;
    const file = Object.values(req.files);
    const cloudImages = await cloudinaryService.save(file);
    const image = await Promise.all(cloudImages);
    const profileImage = await profileImageObject(image);
    const result = await userService.update(id, { profileImage }, "$set");

    await profileService.update(
      id,
      { profileImage: profileImage.original },
      "$set"
    );
    await cloudinaryService.remove(removeCloudId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const {
      user: { id },
      params: { image_id: imageId, cloud_id: cloudId }
    } = req;
    cloudinaryService.remove(cloudId);
    const result = await imageService.remove(id, imageId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.saveTags = async (req, res) => {
  try {
    const {
      user: { id },
      body: tags
    } = req;
    const result = await imageService.saveTags(id, tags);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
