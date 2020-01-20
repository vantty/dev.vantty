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
    const result = await userService.customer(id, token);
    console.log("RES PUSH", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.addCard = async (req, res) => {
  try {
    const {
      user: { id, stripeCustomerId, cards },
      body: {
        token: { id: source }
      }
    } = req;
    const result = await userService.card(stripeCustomerId, source, id, cards);
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
