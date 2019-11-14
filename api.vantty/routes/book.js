const express = require("express"),
  { pay, confirmAccount } = require("../controllers/book"),
  router = express.Router();

router.post("/pay", pay);
router.post("/confirm/:code", confirmAccount);

module.exports = router;
