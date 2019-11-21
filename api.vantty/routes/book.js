const express = require("express"),
  { pay, confirmAccount, saveAccount } = require("../controllers/book"),
  router = express.Router();

router.post("/pay", pay);
router.post("/confirm/:code", confirmAccount);
router.post("/save-account", saveAccount);

module.exports = router;
