const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");
// const Strategy = require("../helpers/getStrategy");

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
    // console.log(profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create or update profile
exports.createANDupdate = async (req, res) => {
  const {
    profilePicture,
    bio,
    profession,
    mobileNumber,
    instagramUsername,
    youtube,
    instagram,
    review,
    country,
    state,
    city,
    price
  } = req.body;
  // console.log(req);
  // Build profile object
  // var method = user.method;

  const profileFields = {};
  profileFields.user = req.user.id;
  // profileFields.firstName = req.user[method].firstName;
  if (profilePicture) profileFields.profilePicture = profilePicture;
  if (bio) profileFields.bio = bio;
  // if (location) profileFields.location = location;
  if (mobileNumber) profileFields.mobileNumber = mobileNumber;
  if (price) profileFields.price = price;
  if (instagramUsername) profileFields.instagramUsername = instagramUsername;
  if (profession) {
    profileFields.profession = profession;
  }
  // if (profession) {
  //   profileFields.profession = profession.split(",").map(pro => pro.trim());
  // }

  // Build location object
  profileFields.location = {};
  if (country) profileFields.location.country = country;
  if (state) profileFields.location.state = state;
  if (city) profileFields.location.city = city;

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }
    // Create review id
    const newReview = new Review({
      user: req.user.id,
      name:
        req.user.local.firstName ||
        req.user.google.firstName ||
        req.user.facebook.firstName
    });
    const reviewArtist = await newReview.save();
    profileFields.reviewId = newReview.id;

    // Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
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

// Add Education
exports.addEducation = async (req, res) => {
  const { school, degree, description } = req.body;

  const newEdu = { school, degree, description };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
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
    // if (profile.portfolioPictures) res.send("Hello");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
