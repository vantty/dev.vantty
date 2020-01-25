const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const passportLocal = passport.authenticate("local", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});
const {
  getById,
  sendConfirmationEmail,
  resendConfirmationEmail,
  register,
  login,
  forgot,
  reset,
  google,
  facebook,
  updatePersonalInfo,
  addUserImage,
  deleteUserPicture,
  isProfile
} = require("../controllers/auth");
const { validator } = require("../helpers");

router.get("/", passportJWT, getById);
router.post("/send", validator, sendConfirmationEmail);
router.post("/resend", resendConfirmationEmail);
router.get("/register/:token", register);

//
router.post("/login", login);
router.post("/forgot", forgot);
router.post("/reset", reset);
router.post("/google", passportGoogle, google);
router.post("/facebook", passportFacebook, facebook);
router.post("/update-info", passportJWT, updatePersonalInfo);
// @route    PUT /profile/profilePicture
// @access   Private
router.put("/user-image", addUserImage);

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.post("/userPicture", passportJWT, deleteUserPicture);
router.post("/is-profile", isProfile);

module.exports = router;
