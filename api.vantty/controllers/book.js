const User = require("../models/User");
const Profile = require("../models/Profile");
const Book = require("../models/Book");
const bookService = require("../services/book");
const profileService = require("../services/profile");
const userService = require("../services/user");
const stripeService = require("../services/stripe");
const { composeEmail } = require("../helpers");

// Complete Service
exports.completeService = async (req, res) => {
  try {
    const { reviewId } = await Profile.findOne({ user: req.body._id });
    const book = await Book.findOne({ user: req.body._id });
    const service = book.bookings.find(
      service => service.bookCode === req.body.code
    );
    if (!service) {
      const error = "NO Service";
      return res.status(500).json(error);
    }
    const {
      stripeCustomerId,
      stripeCardId,
      stripeArtistAccount,
      totalValue
    } = service;
    const user = await User.findOne({ stripeCustomerId: stripeCustomerId });
    let data = await stripeService.charge(
      stripeCustomerId,
      stripeCardId,
      stripeArtistAccount,
      totalValue
    );
    service.state = "completed";
    await book.save();

    // Email subject
    const subject = "Book Completed";

    // Email to User
    let method = user.method;
    const emailUser = user[method].email;
    const urlUser = `${req.headers.origin}/profile/artist/${req.body._id}/${reviewId}`;
    const htmlUser = `Hi ${user[method].firstName}, your book has been completed. Your artist will appriciate a review from you. To write it please <a href=${urlUser}><strong>click here.</strong></a>`;

    composeEmail(emailUser, subject, htmlUser);

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

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

// Create New Booking
exports.createNewBook = async (req, res) => {
  try {
    const {
      user,
      params: { id: bookId },
      body: fields
    } = req;

    const book = await bookService.createBooking(bookId, user, fields);

    // Email subject
    const subject = "Book Requested";

    // Email to User
    const emailUser = user.email;
    const urlUser = `${req.headers.origin}/dashboard/user/apponitments`;
    const htmlUser = `Hi ${user.firstName}, your book has been sent to the artist. Once she accepts the service, we will send you a confirmation email with your booking code. To see the state of your request please <a href=${urlUser}><strong>click here.</strong></a>`;
    composeEmail(emailUser, subject, htmlUser);

    // Email to Artist
    const artist = await User.findById(book.user);
    const emailArtist = artist.email;
    const urlArtist = `${req.headers.origin}/bookings`;
    const htmlArtist = `Hi ${artist.firstName}, you have a new book request. To see the details and accept the request please <a href=${urlArtist}><strong>click here.</strong></a>`;
    composeEmail(emailArtist, subject, htmlArtist);

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
