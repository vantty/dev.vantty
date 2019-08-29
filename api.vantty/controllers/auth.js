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
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // current time + 1h
    },
    JWT_SECRET
  );
};

//Update Personal Info
exports.updatePersonalInfo = async (req, res) => {
  const { firstName, lastName, email, id, password } = req.body;
  console.log("BEFORE", req.body);

  let data = await User.findOne({ _id: id });

  // Build profile object

  const userFields = {};
  // userFields.user = id;
  userFields.method = "local";
  userFields.local = {};
  userFields.local.password = data.local.password;
  if (firstName) userFields.local.firstName = firstName;
  if (lastName) userFields.local.lastName = lastName;
  if (email) userFields.local.email = email;

  try {
    let user = await User.findOneAndUpdate(
      { _id: id },
      { $set: userFields },
      { new: true }
    );
    console.log(user);

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// //Create or Update
// exports.register = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   console.log("USER", user);
//   try {
//     var user = await User.findOne({ "local.email": email });
//     if (user) {
//       const userFields = {};
//       userFields.user = req.user.id;
//       userFields.method = "local";
//       userFields.local = {};
//       if (firstName) userFields.local.firstName = firstName;
//       if (lastName) userFields.local.lastName = lastName;
//       if (email) userFields.local.email = email;
//       console.log("USER INSIDE TRY", user);

//       try {
//         user = await User.findOne({ user: req.user.id });
//         user = await User.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: userFields },
//           { new: true }
//         );

//         return res.json(user);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       const newUser = await User.create({
//         method: "local",
//         local: { firstName, lastName, email, password }
//       });
//       console.log("NEW USER", newUser);

//       const token = generateToken(newUser);
//       res.status(200).json({ token });
//     }
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };
