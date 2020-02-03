const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const { update, deleteAccount } = require("../controllers/users");

router.patch("/", passportJWT, update);
router.delete("/", passportJWT, deleteAccount);

module.exports = router;
