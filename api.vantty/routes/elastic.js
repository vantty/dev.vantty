const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const { load } = require("../controllers/elastic");

router.post("/", passportJWT, load);

module.exports = router;
