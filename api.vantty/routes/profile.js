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
router.put(
  "/categories",
  passportJWT,
  profileValidatorEducation,
  addCategories
);
router.delete("/education/:edu_id", passportJWT, deleteEducation);
router.delete("/profilePicture/:pic_id", passportJWT, deleteProfilePicture);
router.delete(
  "/profile-user-dashboard",
  passportJWT,
  deleteProfileAndUserDashboard
);

module.exports = router;
