const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  passportLocal = passport.authenticate("local", { session: false }),
  passportGoogle = passport.authenticate("googleToken", { session: false }),
  passportFacebook = passport.authenticate("facebookToken", {
    session: false
  }),
  {
    auth,
    register,
    login,
    forgot,
    reset,
    google,
    facebook,
    updatePersonalInfo,
    sendEmail,
    resendEmail,
    confirmEmail,
    addUserImage,
    deleteUserPicture,
    isProfile
  } = require("../controllers/auth"),
  { validator } = require("../helpers"),
  router = express.Router();

router.get("/", passportJWT, auth);
router.post("/register", validator, sendEmail);
router.post("/resend", resendEmail);
router.post("/login", passportLocal, login);
router.post("/forgot", forgot);
router.post("/reset", reset);
router.post("/google", passportGoogle, google);
router.post("/facebook", passportFacebook, facebook);
router.post("/update-info", passportJWT, updatePersonalInfo);
router.get("/confirmation/:token", confirmEmail);
router.post("/validated/:token", register);
// @route    PUT /profile/profilePicture
// @access   Private
router.put("/user-image", addUserImage);

// @route    DELETE /profile/portfolio/:pic_id
// @access   Private
router.post("/userPicture", passportJWT, deleteUserPicture);
router.post("/is-profile", isProfile);

module.exports = router;
