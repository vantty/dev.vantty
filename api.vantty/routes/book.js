const express = require("express"),
  {
    deleteCard,
    createNewBook,
    completeService,
    getBookById,
    current,
    changeStateBooking,
    getUserBookings
  } = require("../controllers/book"),
  router = express.Router(),
  passport = require("passport"),
  passportJWT = passport.authenticate("jwt", { session: false });

router.post("/delete-card", deleteCard);
router.post("/create-book/:id", passportJWT, createNewBook);
router.post("/complete-service", completeService);
router.post("/:id", passportJWT, getBookById);
router.post("/booking/:bookingId", passportJWT, changeStateBooking);
router.get("/", passportJWT, current);
router.get("/user-bookings/:id", getUserBookings);
// router.delete("/comment/:id/:comment_id", passportJWT, deleteComment);

module.exports = router;
