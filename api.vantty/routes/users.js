const express = require("express");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const router = express.Router();
const { deleteAccount } = require("../controllers/users");

router.delete("/", passportJWT, deleteAccount);

module.exports = router;
