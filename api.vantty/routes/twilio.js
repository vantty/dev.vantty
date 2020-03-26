const express = require('express');
const router = express.Router();
// const passport = require("passport");
// const passportJWT = passport.authenticate("jwt", { session: false });
const { send } = require('../controllers/twilio');

router.post('/send', send);

module.exports = router;
