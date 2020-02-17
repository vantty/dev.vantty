const User = require("../models/User");
const Profile = require("../models/Profile");
const Book = require("../models/Book");
const bookService = require("../services/book");
const profileService = require("../services/profile");
const userService = require("../services/user");
const stripeService = require("../services/stripe");
const { composeEmail } = require("../helpers");

// Current User
exports.current = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const profile = await profileService.getById(id);
    const book = await bookService.getById(profile.bookId);
    if (!book) {
      return res.status(400).json({ msg: "There is no book for this user" });
    }
    res.status(200).json(book.bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { user } = req;
    const bookings = await bookService.getUserBookings(user);
    res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

// Create New Booking
exports.createNewBook = async (req, res) => {
  try {
    const {
      user,
      params: { id: bookId },
      body: fields,
      headers: { origin: uri }
    } = req;
    const book = await bookService.createBooking(bookId, user, fields);
    const { date } = fields;
    const { user: artistId } = book;
    const artist = await userService.getById(artistId);
    const state = "requested";
    await bookService.sendEmail(
      user,
      artist,
      uri,
      state,
      null,
      null,
      null,
      date
    );
    res.status(200).json(book.bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.changeStateBooking = async (req, res) => {
  try {
    const {
      body: { state, text: posponeText },
      params: { bookingId },
      headers: { origin: uri }
    } = req;
    const service = await bookService.changeState(bookingId, state);
    const result = await Promise.all(service);
    const { userId, stripeArtistAccount, bookCode } = result[0];
    const user = await userService.getById(userId);
    const { user: artistId } = await profileService.getByField({
      stripeArtistAccount
    });
    const artist = await userService.getById(artistId);
    await bookService.sendEmail(
      user,
      artist,
      uri,
      state,
      bookCode,
      posponeText
    );
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

// Complete Service
exports.completeService = async (req, res) => {
  try {
    const {
      user: { id: artistId },
      params: { book_code: bookCode },
      headers: { origin: uri }
    } = req;
    const state = "completed";
    const {
      stripeCustomerId,
      stripeCardId,
      stripeArtistAccount,
      totalValue
    } = await bookService.complete(artistId, bookCode, state);
    const { status } = await stripeService.charge(
      stripeCustomerId,
      stripeCardId,
      stripeArtistAccount,
      totalValue
    );
    if (status === "succeeded") {
      const user = await userService.getByField({ stripeCustomerId });
      const artist = await userService.getById(artistId);
      const { reviewId } = await profileService.getById(artistId);
      await bookService.sendEmail(
        user,
        artist,
        uri,
        state,
        null,
        null,
        reviewId
      );
    }
    res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
