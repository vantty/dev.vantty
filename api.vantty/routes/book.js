const express = require("express"),
  { pay, createAccount, saveAccount } = require("../controllers/book"),
  router = express.Router();

router.post("/pay", pay);
router.post("/create-account/:code", createAccount);
router.post("/save-account", saveAccount);

module.exports = router;
