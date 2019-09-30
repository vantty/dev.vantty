const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  profileValidator,
  profileValidatorEducation,
  profileValidatorPortfolio
} = require("../helpers");

const {
  current,
  createANDupdate,
  allProfiles,
  profileById,
  deleteUserAndReviews,
  addCategories,
  deleteEducation,
  addPortfolio,
  deletePicture,
  addProfileImage,
  deleteProfilePicture,
  loadToElastic,
  verifiedProfile
} = require("../controllers/profile");

// @desc     Get current users profile
// @access   Private
router.get("/me", passportJWT, current);

// @desc     Create or update user profile
// @access   Private
router.post("/", passportJWT, profileValidator, createANDupdate);

// @desc     Get all profiles
// @access   Public
router.get("/", allProfiles);

// @desc     Get profile by user ID
// @access   Public
router.get("/artist/:user_id", profileById);

// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", passportJWT, deleteUserAndReviews);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/categories",
  passportJWT,
  profileValidatorEducation,
  addCategories
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", passportJWT, deleteEducation);

// @route    PUT /profile/portfolio
// @access   Private
router.put("/portfolio", passportJWT, addPortfolio);

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.delete("/portfolio/:pic_id", passportJWT, deletePicture);

// @route    PUT /profile/profilePicture
// @access   Private
router.put("/profile-image", passportJWT, addProfileImage);

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.delete("/profilePicture/:pic_id", passportJWT, deleteProfilePicture);

// @route    DELETE /profile/verified
// @access   Private
router.post("/verified", verifiedProfile);

router.put("/elastic", passportJWT, loadToElastic);

module.exports = router;
