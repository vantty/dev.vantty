const express = require("express"),
  { pay } = require("../controllers/book"),
  router = express.Router();

router.post("/pay", pay);

module.exports = router;
