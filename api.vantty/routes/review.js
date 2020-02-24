const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const { reviewValidator } = require("../helpers");

const {
  create,
  getById,
  createComment,
  deleteComment
} = require("../controllers/review");

router.get("/:id", getById);
router.post("/artist/:user_id", passportJWT, reviewValidator, create);
router.post("/comment/:id", passportJWT, createComment);
router.delete("/comment/:id/:comment_id", passportJWT, deleteComment);

module.exports = router;
