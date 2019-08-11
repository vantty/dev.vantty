const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  passportLocal = passport.authenticate("local", { session: false }),
  passportGoogle = passport.authenticate("googleToken", { session: false }),
  passportFacebook = passport.authenticate("facebookToken", { session: false }),
  { auth, register, login, google, facebook } = require("../controllers/auth"),
  { validator } = require("../helpers"),
  router = express.Router();

router.get("/", passportJWT, auth);
router.post("/register", validator, register);
router.post("/login", passportLocal, login);
router.post("/google", passportGoogle, google);
router.post("/facebook", passportFacebook, facebook);

module.exports = router;
