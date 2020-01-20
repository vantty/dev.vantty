const express = require("express");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const router = express.Router();
const { deleteAccount, createCustomer } = require("../controllers/users");

router.post("/customer", passportJWT, createCustomer);
router.delete("/", passportJWT, deleteAccount);

module.exports = router;
