const sripeLoader = require("stripe"),
  User = require("../models/User"),
  Profile = require("../models/Profile"),
  Book = require("../models/Book"),
  { composeEmail } = require("../helpers");

const log = console.log;
const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY_TEST);
// const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY);

//
exports.testSendEmail = async (req, res) => {
  try {
    composeEmail("sebhernandezram@gmail.com", "Test", req.body.text);
    res.status(200).json(req.body);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

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
    let user = await User.findById(req.body._id);
    const customer = await stripe.customers.create({
      source: req.body.token.id,
      email: req.body.email,
      name: req.body._id
    });
    const card = await stripe.customers.retrieveSource(
      customer.id,
      customer.default_source
    );
    const newCard = {
      stripeCardId: customer.default_source,
      brand: card.brand,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      last4: card.last4
    };
    user.stripeCustomerId = customer.id;
    user.cards.push(newCard);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

exports.addCard = async (req, res) => {
  try {
    let user = await User.findById(req.body._id);
    const { stripeCustomerId } = user;
    stripe.customers
      .createSource(stripeCustomerId, {
        source: req.body.token.id
      })
      .then(async card => {
        const newCard = {
          stripeCardId: card.id,
          brand: card.brand,
          expMonth: card.exp_month,
          expYear: card.exp_year,
          last4: card.last4
        };
        user.cards.push(newCard);
        await user.save();
      });
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
      amount: amount * 100 * 0.72,
      destination: artist
    }
  });
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
    service.state = "completed";
    await book.save();
    res.status(200).json(data);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

//////////////////////////
///BOOK
//////////////////////////

// Current User
exports.current = async (req, res) => {
  try {
    // var method = "";
    const profile = await Profile.findOne({ user: req.user.id });
    const book = await Book.findById(profile.bookId);
    if (!book) {
      return res.status(400).json({ msg: "There is no book for this user" });
    }
    res.json(book.bookings);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Images not found" });
    }
    res.status(500).send("Server Error");
  }
};

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

// @desc     Get review by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc  Create New Booking
exports.createNewBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const book = await Book.findById(req.params.id);
    let method = user.method;

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
      name: user[method].firstName,
      appointment: req.body.date,
      address: req.body.address,
      descriptionAddress: req.body.descriptionAddress,
      hour: req.body.hour,
      services: req.body.services,
      totalValue: req.body.totals
    };
    book.bookings.unshift(newBook);
    await book.save();

    // Email subject
    const subject = "Book Requested";

    // Email to User
    const emailUser = user[method].email;
    const urlUser = `${req.headers.origin}/dashboard/user/apponitments`;
    const htmlUser = `Hi ${user[method].firstName}, your book has been sent to the artist. Once she accepts the service, we will send you a confirmation email with your booking code. To see the state of your request please <a href=${urlUser}><strong>click here.</strong></a>`;
    composeEmail(emailUser, subject, htmlUser);

    // Email to Artist
    const artist = await User.findById(book.user);
    const emailArtist = artist[method].email;
    const urlArtist = `${req.headers.origin}/bookings`;
    const htmlArtist = `Hi ${artist[method].firstName}, you have a new book request. To see the details and accept the request please <a href=${urlArtist}><strong>click here.</strong></a>`;
    composeEmail(emailArtist, subject, htmlArtist);

    res.json(book.bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Change State Booking
// exports.changeStateBooking = async (req, res) => {
//   log(req.body);
//   log(req.params.bookingId);
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     const book = await Book.findById(profile.bookId);

//     if (!book) {
//       return res.status(404).json({ msg: "Review not found" });
//     }
//     res.json(book);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Review not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// };

exports.changeStateBooking = async (req, res) => {
  try {
    const { state } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    const book = await Book.findById(profile.bookId);

    for (const x of book.bookings) {
      if (x._id == req.params.bookingId) {
        x.state = state;
      }
    }
    book.save();

    const service = book.bookings.find(
      service => service._id == req.params.bookingId
    );

    // Mailing info

    // User Mailing Info
    const user = await User.findOne({
      stripeCustomerId: service.stripeCustomerId
    });
    let method = user.method;
    const emailUser = user[method].email;
    const urlUser = `${req.headers.origin}/dashboard/user/apponitments`;

    // Artist Mailing Info
    const artist = await User.findById(book.user);
    const emailArtist = artist[method].email;
    const urlArtist = `${req.headers.origin}/bookings`;

    if (service.state === "accepted") {
      // Email subject
      const subject = "Book Accepted";

      // Email to User
      const htmlUser = `Hi ${user[method].firstName}, your book has been accepted by the artist. Your booking code is: <strong>${service.bookCode}</strong>. Please save this code, because you have to give it to the artist once she finish your service. If you need to modify or cancell the service please <a href=${urlUser}><strong>click here.</strong></a>`;
      composeEmail(emailUser, subject, htmlUser);

      // Email to Artist
      const htmlArtist = `Hi ${artist[method].firstName}, you have accepted the book request. To see the details of the service please <a href=${urlArtist}><strong>click here.</strong></a>`;
      composeEmail(emailArtist, subject, htmlArtist);
    }

    if (service.state === "declined") {
      // Email subject
      const subject = "Book Declined";

      // Email to User
      const htmlUser = `Hi ${user[method].firstName}, your book has been declined by the artist. Please go back to Vantty and <a href=${urlUser}><strong>search for another artist.</strong></a>`;
      composeEmail(emailUser, subject, htmlUser);

      // Email to Artist
      const htmlArtist = `Hi ${artist[method].firstName}, you have declined the book request. To see the details of the declined service please <a href=${urlArtist}><strong>click here.</strong></a>`;
      composeEmail(emailArtist, subject, htmlArtist);
    }

    res.json(book.bookings);
  } catch (err) {
    res.send(err);
  }
};

// try {
//   const sendTags = req.body;
//   const profile = await Profile.findOne({ user: req.user.id });
//   const images = await Image.findById(profile.imagesId);

//   let pictures = images.pictures;

//   const arr = Array.from(pictures);
//   const arr2 = Array.from(sendTags);
//   for (const x of arr) {
//     for (const y of arr2) {
//       if (x._id == y._id) {
//         x.tag = y.tag;
//       }
//     }
//   }
//   images.save();
//   res.json(images);
// } catch (error) {
//   console.log(error);
// }
// };
