const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  createNewBook,
  completeService,
  getBookById,
  current,
  changeStateBooking,
  getUserBookings
} = require("../controllers/book");

router.get("/", passportJWT, current);
router.post("/create-book/:id", passportJWT, createNewBook);
router.post("/complete-service", completeService);
router.post("/:id", passportJWT, getBookById);
router.post("/booking/:bookingId", passportJWT, changeStateBooking);
router.get("/user-bookings/:id", getUserBookings);

module.exports = router;
