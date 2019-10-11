const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
