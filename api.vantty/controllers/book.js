const sripeLoader = require("stripe");

const Review = require("../models/Review");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Book = require("../models/Book");

const log = console.log;

const stripe = new sripeLoader("sk_test_g2kklNhtnwCW3w7V0cnc00R500BZdHcbNV");

const charge = (token, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: "cad",
    source: token,
    description: "Vantty Service"
  });
};

exports.pay = async (req, res) => {
  try {
    let data = await charge(req.body.token.id, req.body.amount);
    log(data);
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

      appointment: req.body.date,
      address: req.body.address,
      descriptionAddress: req.body.descriptionAddress,
      hour: req.body.hour,
      services: req.body.services,
      totalValue: req.body.totals
    };
    book.bookings.unshift(newBook);

    await book.save();

    res.json(book.bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
