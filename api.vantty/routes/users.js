const express = require("express"),
  { allUsers } = require("../controllers/users"),
  router = express.Router();

router.get("/", allUsers);

module.exports = router;
