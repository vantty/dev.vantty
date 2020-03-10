const express = require("express");
const router = express.Router();
const { test } = require("../controllers/users");

router.post("/", test);

module.exports = router;
