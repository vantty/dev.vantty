const JWT = require("jsonwebtoken"),
  JWT_SECRET = "vanttymakeup",
  User = require("../models/User");

exports.auth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-local.password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ "local.email": email });
    if (user) {
      return res.status(403).json({ errors: [{ msg: "User already exists" }] });
    }
    const newUser = await User.create({
      method: "local",
      local: { firstName, lastName, email, password }
    });
    const token = generateToken(newUser);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.google = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.facebook = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Token Generator
generateToken = user => {
  return JWT.sign(
    {
      iss: "vantty",
      sub: user.id,
      iat: Math.floor(Date.now() / 1000), // current time
      exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 // current time + 1yr
    },
    JWT_SECRET
  );
};

//Update Personal Info
exports.updatePersonalInfo = async (req, res) => {
  const { firstName, lastName, email, id } = req.body;

  let data = await User.findOne({ _id: id });
  // console.log("DATA", data);
  // console.log("BODY", req.body);
  // Build profile object

  const strategy = data.method;
  const userFields = {};
  userFields.method = strategy;
  userFields[strategy] = {};

  //General
  userFields[strategy].id = data[strategy].id;
  userFields[strategy].profilePicture = data[strategy].profilePicture;
  userFields[strategy].password = data[strategy].password;
  if (firstName) userFields[strategy].firstName = firstName;
  if (lastName) userFields[strategy].lastName = lastName;
  if (email) userFields[strategy].email = email;

  try {
    let user = await User.findOneAndUpdate(
      { _id: id },
      { $set: userFields },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
