const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");
const profileService = require("../services/profile");
const stripeService = require("../services/stripe");
const userService = require("../services/user");
const elasticService = require("../services/elastic");

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

// Create
exports.create = async (req, res) => {
  try {
    const { user, body: fields } = req;

    const result = await profileService.create(user, fields);
    res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const {
      user: { id },
      body: fields
    } = req;
    const result = await profileService.update(id, fields, "$set");

    res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Categories
exports.addCategories = async (req, res) => {
  try {
    const {
      user: { id },
      body: { stateHair, stateMakeup }
    } = req;

    await profileService.update(
      id,
      { "categories.hair": stateHair.splice(0) },

      "$set"
    );
    const result = await profileService.update(
      id,
      { "categories.makeup": stateMakeup.splice(0) },

      "$set"
    );

    res.status(200).json(result);
  } catch (err) {
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

exports.verifiedProfile = async (req, res) => {
  try {
    const {
      body: { id, verified }
    } = req;
    const result = await profileService.update(id, { verified }, "$set");

    res.status(200).json(result);
  } catch (err) {
    res.send(err);
  }
};

// Add Services
exports.addService = async (req, res) => {
  try {
    const {
      user: { id, profile },
      body
    } = req;

    const result = await profileService.update(
      id,
      { services: { $each: [body], $position: 0 } },
      "$push"
    );

    if (profile === false) {
      userService.update(id, { profile: true }, "$set");
      profileService.update(id, { profileStarted: false }, "$set");
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Service
exports.deleteService = async (req, res) => {
  try {
    const {
      user: { id },
      params: { serv_id }
    } = req;

    const result = await profileService.removeService(id, serv_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DELETE profile and User Dashboard
//NOTA: we can activate this function. Right now is not working,
exports.deleteProfileAndUserDashboard = async (req, res) => {
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

////////////////////////////////////
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
