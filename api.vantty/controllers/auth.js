const JWT = require("jsonwebtoken"),
  JWT_SECRET = "vanttymakeup",
  EMAIL_SECRET = "emailsecret",
  User = require("../models/User"),
  Profile = require("../models/Profile"),
  nodemailer = require("nodemailer");
const { getStrategy } = require("../helpers");

exports.auth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-local.password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.sendEmail = async (req, res) => {
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

    const emailToken = generateEmailToken(newUser);
    const url = `http://localhost:3000/confirmation/${emailToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sebhernandezram@gmail.com",
        pass: "S.Hernandez.R.20.G"
      }
    });

    const mailOptions = {
      from: "sebhernandezram@gmail.com",
      to: `${email}`,
      subject: "Confirm Email",
      html: `Welcome to Vantty, ${firstName}! Please click this link to confirm your email: <a href="${url}">Click Here</a>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const tokenVerified = JWT.verify(req.params.token, EMAIL_SECRET);
    const id = tokenVerified.user;
    let user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { confirmed: true } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.register = async (req, res) => {
  try {
    const tokenVerified = JWT.verify(req.params.token, EMAIL_SECRET);
    const id = tokenVerified.user;
    const user = await User.findOne({ _id: id });
    if (!user.confirmed) {
      return res
        .status(403)
        .json({ errors: [{ msg: "Please validate your email" }] });
    }
    const token = generateToken(user);
    console.log("LOGIN TOKEN", token);
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

// Login Token Generator
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

// Email Token Generator
generateEmailToken = user => {
  return JWT.sign({ user: user.id }, EMAIL_SECRET, { expiresIn: "1d" });
};

//Update Personal Info
exports.updatePersonalInfo = async (req, res) => {
  const { firstName, lastName, email, id, profilePicture } = req.body;

  let data = await User.findById({ _id: id });

  // Build profile object
  const strategy = data.method;
  const userFields = {};
  userFields.method = strategy;
  userFields[strategy] = {};
  //General
  userFields[strategy].id = data[strategy].id;
  userFields[strategy].password = data[strategy].password;
  if (firstName) userFields[strategy].firstName = firstName;
  if (lastName) userFields[strategy].lastName = lastName;
  if (email) userFields[strategy].email = email;

  if (profilePicture) userFields[strategy].profilePicture = profilePicture;

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

// Add User Pictures
exports.addUserImage = async (req, res) => {
  const { original, cloudId, id } = req.body;
  const newPicture = { original, cloudId };

  try {
    const user = await User.findById(id);

    const strategy = user.method;
    user[strategy].profilePicture = newPicture;

    await user.save();
    res.json(user);

    // if (user.portfolioPictures) res.send("Hello");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete ProfilePicture
exports.deleteUserPicture = async (req, res) => {
  console.log(req.body);
  try {
    // const user = await User.findOne({ user: req.user.id });

    // Get remove index
    // const removeIndex = user.profilePicture
    //   .map(item => item.id)
    //   .indexOf(req.params.pic_id);

    // // user.profilePicture.splice(removeIndex, 1);
    // user.profilePicture.shift();

    // await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
