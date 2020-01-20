const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const userService = require("../services/user");

exports.createCustomer = async (req, res) => {
  try {
    const {
      user: { id },
      body: {
        token: { id: token }
      }
    } = req;
    console.log("INPUT", id, token);
    const result = await userService.customer(id, token);

    // let user = await User.findById(req.body._id);
    // const customer = await stripe.customers.create({
    //   source: req.body.token.id,
    //   email: req.body.email,
    //   name: req.body._id
    // });
    // const card = await stripe.customers.retrieveSource(
    //   customer.id,
    //   customer.default_source
    // );
    // const newCard = {
    //   stripeCardId: customer.default_source,
    //   fingerPrint: card.fingerprint,
    //   brand: card.brand,
    //   expMonth: card.exp_month,
    //   expYear: card.exp_year,
    //   last4: card.last4
    // };
    // user.stripeCustomerId = customer.id;
    // user.cards.push(newCard);
    // await user.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const result = await userService.deleteById(id);
    res.status(204).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
