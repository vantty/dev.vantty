const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  createAccount,
  createCustomer,
  createCustomerCard,
  deleteCustomerCard
} = require("../controllers/stripe");

router.post("/account/:code", passportJWT, createAccount);
router.post("/customer", passportJWT, createCustomer);
router.post("/card", passportJWT, createCustomerCard);
router.delete("/card/:card_id", passportJWT, deleteCustomerCard);

module.exports = router;
