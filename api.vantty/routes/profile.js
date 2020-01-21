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
  getByUser,
  getById,
  getAll,
  createAndUpdate,
  addCategories,
  deleteEducation,
  addProfileImage,
  deleteProfilePicture,
  loadToElastic,
  verifiedProfile,
  deleteProfileAndUserDashboard,
  addService,
  deleteService,
  createStripeAccount
} = require("../controllers/profile");

router.get("/me", passportJWT, getByUser);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", passportJWT, profileValidator, createAndUpdate);
router.post("/account/:code", passportJWT, createStripeAccount);

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

// @route    PUT /profile/profilePicture
// @access   Private
router.put("/profile-image", passportJWT, addProfileImage);

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.delete("/profilePicture/:pic_id", passportJWT, deleteProfilePicture);
// @route    DELETE /profile/verified
// @access   Private
router.post("/verified", verifiedProfile);

// @route    PUT /profile/elastic
// @access   Private
router.put("/elastic", passportJWT, loadToElastic);

// @route    DELETE /profile/profile-user-dashboard
// @access   Private
router.delete(
  "/profile-user-dashboard",
  passportJWT,
  deleteProfileAndUserDashboard
);

// @route    PUT /profile/add-tags
// @access   Private
router.post("/add-service", passportJWT, addService);

router.delete("/delete-service/:serv_id", passportJWT, deleteService);

module.exports = router;
