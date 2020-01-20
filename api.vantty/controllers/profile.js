const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");
const Image = require("../models/Image");
const profileService = require("../services/profile");
const stripeService = require("../services/stripe");

// Get Current Profile By User Id
exports.getByUser = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const result = await profileService.getById(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Profile By Params Id
exports.getById = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const result = await profileService.getById(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get All Profiles
exports.getAll = async (req, res) => {
  try {
    const result = await profileService.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create and Update Profile
exports.createAndUpdate = async (req, res) => {
  try {
    const { body: profile, user } = req;
    const result = await profileService.save(profile, user);
    res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Categories
exports.addCategories = async (req, res) => {
  const make = req.body.stateMakeup;
  const hair = req.body.stateHair;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.categories.makeup = await make.splice(0);
    profile.categories.hair = await hair.slice(0);

    await profile.save();
    await res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Delete education from profile
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Porfolio Pictures
exports.addProfileImage = async (req, res) => {
  const { original, cloudId } = req.body;
  const newPicture = { original, cloudId };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    await profile.profilePicture.unshift(newPicture);
    await profile.save();
    res.json(profile);
    // if (profile.portfolioPictures) res.send("Hello");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete ProfilePicture
exports.deleteProfilePicture = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.profilePicture
      .map(item => item.id)
      .indexOf(req.params.pic_id);

    // profile.profilePicture.splice(removeIndex, 1);
    profile.profilePicture.shift();

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.loadToElastic = async (req, res) => {
  const { allElasticId, imagesId } = req.body;

  let images = await Image.findById({ _id: imagesId });
  let pictures = images.pictures;

  const arr = Array.from(pictures);
  const arr2 = Array.from(allElasticId);
  for (const x of arr) {
    for (const y of arr2) {
      if (x._id == y._id) {
        x.elasticId = y.elasticId;
        x.tag = y.tag;
      }
    }
  }
  images.save();
  res.status(200).json(images);
};

exports.verifiedProfile = async (req, res) => {
  try {
    const { id, verified } = req.body;
    const profileId = await Profile.findOne({ user: id });
    let profile = await Profile.findOneAndUpdate(
      { _id: profileId.id },
      { $set: { verified } },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    res.send(err);
  }
};

// DELETE profile and User Dashboard
exports.deleteProfileAndUserDashboard = async (req, res) => {
  console.log(req);
  try {
    // Remove user review
    await Review.deleteMany({ user: req.body.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.body.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.body.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 1");
  }
};

// Add Services
exports.addService = async (req, res) => {
  const { typeOfService, description, amount } = req.body;

  const newService = { typeOfService, description, amount };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.services.unshift(newService);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Service
exports.deleteService = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.services
      .map(item => item.id)
      .indexOf(req.params.serv_id);

    profile.services.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createStripeAccount = async (req, res) => {
  try {
    const {
      user: { id },
      params: { code }
    } = req;
    const result = stripeService.account(id, code);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
