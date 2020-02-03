const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const { profileValidator, profileValidatorEducation } = require("../helpers");
const {
  getByUser,
  getById,
  getAll,
  addCategories,
  deleteEducation,
  deleteProfilePicture,
  loadToElastic,
  verifiedProfile,
  deleteProfileAndUserDashboard,
  addService,
  deleteService,
  create,
  update
} = require("../controllers/profile");

router.get("/me", passportJWT, getByUser);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", passportJWT, profileValidator, create);
router.patch("/", passportJWT, profileValidator, update);
router.post("/verified", verifiedProfile);
router.post("/service", passportJWT, addService);
router.delete("/service/:serv_id", passportJWT, deleteService);
router.put("/elastic", passportJWT, loadToElastic);
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

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.delete("/profilePicture/:pic_id", passportJWT, deleteProfilePicture);

// @route    DELETE /profile/profile-user-dashboard
// @access   Private
router.delete(
  "/profile-user-dashboard",
  passportJWT,
  deleteProfileAndUserDashboard
);

module.exports = router;
