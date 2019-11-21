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
