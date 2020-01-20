const express = require("express");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const router = express.Router();
const {
  deleteAccount,
  createCustomer,
  addCard
} = require("../controllers/users");

router.post("/customer", passportJWT, createCustomer);
router.post("/card", passportJWT, addCard);
router.delete("/", passportJWT, deleteAccount);

module.exports = router;
