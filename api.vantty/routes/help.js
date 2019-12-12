const express = require("express"),
  { sendEmail } = require("../controllers/help"),
  router = express.Router();

router.post("/send-email", sendEmail);

module.exports = router;
