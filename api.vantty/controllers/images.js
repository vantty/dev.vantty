const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "vantty",
  api_key: "649734415391172",
  api_secret: "rI4jV_piPjs1uJ_Z73DWgLYhbyk"
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
  console.log(req.body);
  cloudinary.v2.uploader
    .destroy(id)
    .then(results => {
      res.json(results);
    })
    .catch(err => res.status(400).json(err));
};
