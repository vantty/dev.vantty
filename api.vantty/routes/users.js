const express = require("express");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const router = express.Router();
const { allUsers, deleteAccount } = require("../controllers/users");

router.get("/", allUsers);
router.delete("/", passportJWT, deleteAccount);

module.exports = router;
