const sripeLoader = require("stripe");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Book = require("../models/Book");

const log = console.log;
const stripe = new sripeLoader("sk_test_2ZvJXkOqKtXmex8vDaAeuTsm00SBivNKpy");

// Create Stripe Artist Account
exports.createAccount = async (req, res) => {
  try {
    const data = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: req.params.code
    });
    res.status(200).json(data);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

// Save Stripe Artist Account
exports.saveAccount = async (req, res) => {
  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.body._id },
      { $set: { stripeArtistAccount: req.body.stripe_user_id } },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

// Create and Save Stripe Customer Id
exports.createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      source: req.body.token.id,
      email: req.body.email,
      name: req.body._id
    });
    let user = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { stripeCustomerId: customer.id } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

// Create Charge
const charge = (customer, artist, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: "cad",
    customer: customer,
    description: "Vantty Service",
    transfer_data: {
      destination: artist
    },
    application_fee_amount: amount * 100 * 0.3
  });
};

// Make payment
exports.pay = async (req, res) => {
  try {
    const { stripeCustomerId } = await User.findOne({ _id: req.body._id });
    let data = await charge(
      stripeCustomerId,
      req.body.stripeArtistAccount,
      req.body.amount
    );
    res.status(200).json(data);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

// Complete Service
exports.completeService = async (req, res) => {
  try {
    const book = await Book.findOne({ user: req.body._id });
    const service = book.bookings.find(
      service => service.bookCode === req.body.code
    );
    const { stripeCustomerId, stripeArtistAccount, totalValue } = service;
    let data = await charge(stripeCustomerId, stripeArtistAccount, totalValue);

    log("BACK", data);
    res.status(200).json(data);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

///BOOK
// Current User
// exports.current = async (req, res) => {
//   try {
//     // var method = "";
//     const profile = await Profile.findOne({ user: req.user.id });
//     const images = await Image.findById(profile.imagesId);

//     if (!images) {
//       return res.status(400).json({ msg: "There is no images for this user" });
//     }
//     res.json(images.pictures);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Images not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// };

// @desc     Get all Books
// exports.allReviews = async (req, res) => {
//   try {
//     const review = await Review.find().sort({ date: -1 });
//     res.json(review);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// @desc     Comment on a reviews
exports.createNewBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const book = await Book.findById(req.params.id);
    log(book);

    var method = user.method;

    const newBook = {
      // rating: req.body.rating,
      // text: req.body.text,
      // subject: req.body.subject,
      // name: user[method].firstName,
      // profilePicture: user[method].profilePicture.original,
      // user: req.user.id,
      bookCode: req.body.bookCode,
      stripeCustomerId: req.body.stripeCustomerId,
      stripeArtistAccount: req.body.stripeArtistAccount,
      appointment: req.body.date,
      address: req.body.address,
      descriptionAddress: req.body.descriptionAddress,
      hour: req.body.hour,
      services: req.body.services,
      totalValue: req.body.totals
    };
    console.log("NEW", newBook);
    book.bookings.unshift(newBook);

    await book.save();

    res.json(book.bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
