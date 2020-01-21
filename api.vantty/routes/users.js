const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  deleteAccount,
  createCustomer,
  saveCard,
  deleteCard
} = require("../controllers/users");

router.post("/customer", passportJWT, createCustomer);
router.post("/card", passportJWT, saveCard);
router.delete("/card/:card_id", passportJWT, deleteCard);
router.delete("/", passportJWT, deleteAccount);

module.exports = router;
