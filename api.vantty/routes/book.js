const express = require("express"),
  {
    pay,
    createAccount,
    saveAccount,
    createCustomer
  } = require("../controllers/book"),
  router = express.Router();

router.post("/pay", pay);
router.post("/create-account/:code", createAccount);
router.post("/save-account", saveAccount);
router.post("/create-customer", createCustomer);

module.exports = router;
