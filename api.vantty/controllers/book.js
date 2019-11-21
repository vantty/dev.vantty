const sripeLoader = require("stripe");
const User = require("../models/User");
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
    let user = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { stripeArtistAccount: req.body.stripe_user_id } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

const customer = (token, email) => {
  return stripe.customers.create({
    source: token,
    email: email
  });
};

const charge = (customer, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: "cad",
    // source: token,
    customer: customer.id,
    description: "Vantty Service",
    transfer_data: {
      destination: "acct_1FeVZeFkruuAIst4"
    },
    application_fee_amount: amount * 100 * 0.271 - 30 * 100
  });
};

exports.pay = async (req, res) => {
  try {
    let newCustomer = await customer(req.body.token.id, "juan@gmail.com");
    log(newCustomer);
    let data = await charge(newCustomer, req.body.amount);
    log(data);
    res.status(200).json(data);
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

// exports.createCustomer = async (req,res)=>{
//   try {
//     const customer = await stripe.customers.create({
//       source: req.body.token.id,
//       email: req.body.email
//     });
//     let user = await User.findOneAndUpdate(
//       { _id: req.user.id },
//       { $set: { stripeCustomerId: customer.id } },
//       { new: true }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     log(error);
//     res.status(500).json(error);
//   }
// }
