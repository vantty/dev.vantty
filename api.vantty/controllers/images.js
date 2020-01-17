const cloudinary = require("cloudinary");
const Image = require("../models/Image");
const imageService = require("../services/image");
const cloudinaryService = require("../services/cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get Current Images By User Id
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

// Get Images By Params Id
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

// Save Images in Cloudinary and DB
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

// Delete Images in Cloudinary and DB
exports.remove = async (req, res) => {
  try {
    const {
      user: { id },
      body: { cloudId },
      params: { image_id: imageId }
    } = req;
    await cloudinaryService.remove(cloudId);
    const result = await imageService.remove(id, imageId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addPictureTags = async (req, res) => {
  try {
    const sendTags = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    const images = await Image.findById(profile.imagesId);

    let pictures = images.pictures;

    const arr = Array.from(pictures);
    const arr2 = Array.from(sendTags);
    for (const x of arr) {
      for (const y of arr2) {
        if (x._id == y._id) {
          x.tag = y.tag;
        }
      }
    }
    images.save();
    res.json(images);
  } catch (error) {
    console.log(error);
  }
};
