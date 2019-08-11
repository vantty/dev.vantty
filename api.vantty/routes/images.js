const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  { addImages } = require("../controllers/images"),
  { deleteImages } = require("../controllers/images"),
  router = express.Router();

router.post("/add", addImages);
router.post("/delete", deleteImages);

module.exports = router;
