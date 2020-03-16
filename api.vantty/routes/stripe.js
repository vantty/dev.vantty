const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  createAccount,
  retrieveAccount,
  deleteAccount,
  createCustomer,
  createCustomerCard,
  deleteCustomerCard,
  generateLink
} = require("../controllers/stripe");

router.post("/account/:code", passportJWT, createAccount);
router.get("/account/:account_id", retrieveAccount);
router.delete("/account/:account_id", deleteAccount);
router.post("/customer", passportJWT, createCustomer);
router.post("/card", passportJWT, createCustomerCard);
router.delete("/card/:card_id", passportJWT, deleteCustomerCard);
router.post("/link/:account_id", generateLink);

module.exports = router;
