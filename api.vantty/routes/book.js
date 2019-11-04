// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const passportJWT = passport.authenticate("jwt", { session: false });
// const { reviewValidator } = require("../helpers");

// const { create } = require("../controllers/review");

// // @route    POST api/posts
// // @desc     Create a post
// // @access   Private
// // router.post('/', passportJWT, reviewValidator, create);

// // @route    GET api/posts
// // @desc     Get all posts
// // @access   Private
// // router.get('/', allReviews);

// // @route    GET api/posts/:id
// // @desc     Get post by ID
// // @access   Private
// router.get("/:id", reviewById);

// // @route    DELETE api/posts/:id
// // @desc     Delete a post
// // @access   Private
// router.delete("/:id", passportJWT, deleteReview);

// //=====================
// // Vantty comments routes
// //=====================

// router.post("/comment/:id", passportJWT, commentReview);

// router.delete("/comment/:id/:comment_id", passportJWT, deleteComment);

// router.post("/artist/:user_id", create);

// module.exports = router;
