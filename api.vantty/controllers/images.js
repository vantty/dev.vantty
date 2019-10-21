const cloudinary = require("cloudinary");
const Image = require("../models/Image");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Current User
exports.current = async (req, res) => {
  try {
    // var method = "";
    const profile = await Profile.findOne({ user: req.user.id });
    const images = await Image.findById(profile.imagesId);

    if (!images) {
      return res.status(400).json({ msg: "There is no images for this user" });
    }
    res.json(images.pictures);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Images not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc     Get images by ID
exports.imagesById = async (req, res) => {
  try {
    const images = await Image.findOne({ user: req.params.id });

    if (!images) {
      return res.status(404).json({ msg: "Images not found" });
    }

    res.json(images.pictures);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Images not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.addImages = (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image =>
    cloudinary.v2.uploader.upload(image.path)
  );
  Promise.all(promises)
    .then(results => {
      res.json(results);
    })
    .catch(err => res.status(400).json(err));
};

exports.deleteImages = (req, res) => {
  const id = Object.values(req.body);
  cloudinary.v2.uploader
    .destroy(id)
    .then(results => {
      res.json(results);
    })
    .catch(err => res.status(400).json(err));
};

// Add Porfolio Pictures
exports.addPortfolio = async (req, res) => {
  const { original, cloudId } = req.body;
  const newPicture = { original, cloudId };

  try {
    const images = await Image.findOne({ user: req.user.id });
    await images.pictures.unshift(newPicture);
    await images.save();
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc     Delete picture
exports.deleteImageMongo = async (req, res) => {
  try {
    const images = await Image.findById(req.params.id);

    // Pull out picture
    const picture = images.pictures.find(
      picture => picture.id === req.params.image_id
    );
    // Make sure picture exists
    if (!picture) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Get remove index
    const removeIndex = images.pictures
      .map(picture => picture.id)
      .indexOf(req.params.image_id);

    images.pictures.splice(removeIndex, 1);

    await images.save();

    res.json(images.pictures);
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
