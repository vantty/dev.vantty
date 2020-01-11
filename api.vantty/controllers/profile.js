const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");
const Image = require("../models/Image");

const profileService = require("../services/profile");
// Current User
exports.current = async (req, res) => {
  try {
    // var method = "";
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      // ["local.firstName"]
      [`${req.user.method}.firstName`, `${req.user.method}.lastName`]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create or update profile
exports.createANDupdate = async (req, res) => {
  try {
    const { body: profile, user } = req;

    const result = await profileService.save(profile, user);

    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all profiles
exports.allProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "local.firstName" || "google.firstName" || "facebook.firstName",
      "local.lastName" || "google.lastName" || "facebook.lastName"
    ]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 1");
  }
};

// Get profile by Id
exports.profileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", [
      "local.firstName" || "google.firstName" || "facebook.firstName",
      "local.lastName" || "google.lastName" || "facebook.lastName"
    ]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
};

// DELETE profile
exports.deleteUserAndReviews = async (req, res) => {
  try {
    // Remove user review
    await Review.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error 1");
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
exports.addPortfolio = async (req, res) => {
  const { original, cloudId } = req.body;
  const newPicture = { original, cloudId };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    await profile.portfolioPictures.unshift(newPicture);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addPictureTags = async (req, res) => {
  try {
    const sendTags = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    let pictures = profile.portfolioPictures;

    const arr = Array.from(pictures);
    const arr2 = Array.from(sendTags);
    for (const x of arr) {
      for (const y of arr2) {
        if (x._id == y._id) {
          x.tag = y.tag;
        }
      }
    }
    profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
  }
};

// Delete Porfolio
exports.deletePicture = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.portfolioPictures
      .map(item => item.id)
      .indexOf(req.params.pic_id);

    profile.portfolioPictures.splice(removeIndex, 1);

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

///SERVICESSS

// Add Service
// exports.addService = async (req, res) => {
//   log(req.body);

//   try {
//     const profile = await Profile.findOne({ user: req.user._id });

//     profile.services.push(req.body.services);

//     await profile.save();
//     await res.json(profile);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

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
