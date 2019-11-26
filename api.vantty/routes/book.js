const express = require("express"),
  {
    pay,
    createAccount,
    saveAccount,
    createCustomer,
    createNewBook,
    completeService
  } = require("../controllers/book"),
  router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router.post("/pay", pay);
router.post("/create-account/:code", createAccount);
router.post("/save-account", saveAccount);
router.post("/create-customer", createCustomer);
router.post("/create-book/:id", passportJWT, createNewBook);
router.post("/complete-service", completeService);
// router.delete("/comment/:id/:comment_id", passportJWT, deleteComment);

module.exports = router;
