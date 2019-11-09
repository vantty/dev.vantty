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
