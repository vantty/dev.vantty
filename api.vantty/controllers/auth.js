const JWT = require("jsonwebtoken");
const User = require("../models/User");
const async = require("async");
const crypto = require("crypto");
const { composeEmail, generateLoginToken } = require("../helpers");
const userService = require("../services/user");
const authService = require("../services/auth");

exports.getById = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const result = await userService.getById(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.sendConfirmationEmail = async (req, res) => {
  try {
    const {
      body: { email, firstName, lastName, password },
      headers: { origin: uri }
    } = req;
    const existingUser = await userService.getByField({ email });
    if (existingUser) {
      return res.status(401).send("User already exists");
    }
    const result = await userService.create(
      email,
      firstName,
      lastName,
      password
    );
    authService.sendConfirmationEmail(result, uri);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.resendConfirmationEmail = async (req, res) => {
  try {
    const {
      body: user,
      headers: { origin: uri }
    } = req;
    const result = await authService.sendConfirmationEmail(user, uri);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.register = async (req, res) => {
  try {
    const {
      params: { token: registerToken }
    } = req;
    const token = await authService.register(registerToken);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const {
      body: { email, password }
    } = req;
    const user = await userService.getByField({ email });
    if (!user)
      return res
        .status(403)
        .json({ message: "Please check you email address and your password" });
    const isMatch = await user.isValidPassword(password);
    if (!isMatch)
      return res
        .status(403)
        .json({ message: "Please check you email address and your password" });
    const { id, confirmed } = user;
    if (!confirmed)
      return res.status(403).json({ message: "Please confirm your email" });
    const token = await generateLoginToken(id);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.forgot = (req, res, next) => {
  async.waterfall(
    [
      done => {
        crypto.randomBytes(20, (err, buf) => {
          let token = buf.toString("hex");
          done(err, token);
        });
      },
      (token, done) => {
        User.findOne({ "local.email": req.body.email }, (err, user) => {
          if (!user) {
            return res
              .status(403)
              .json({ errors: [{ msg: "No account with that email exists" }] });
          }
          user.local.resetPasswordToken = token;
          user.local.resetPasswordExpires = Date.now() + 3600 * 1000; // 1h
          user.save(err => {
            done(err, token, user);
          });
        });
      },
      (token, user, done) => {
        const subject = "Reset Password";
        const url = `${req.headers.origin}/reset/${token}`;
        const { firstName, email } = user.local;
        const html = `Hi ${firstName}. Please click this link to reset your password: <a href=${url}><strong>Click Here.</strong></a>`;
        composeEmail(email, subject, html);
        done();
        return res.status(200).json(user);
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
};

exports.forgotPass = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.reset = async (req, res, next) => {
  const { token, password } = req.body;
  async.waterfall(
    [
      done => {
        User.findOne(
          {
            "local.resetPasswordToken": token,
            "local.resetPasswordExpires": { $gt: Date.now() }
          },
          async (err, user) => {
            if (!user) {
              return res.status(403).json({
                errors: [
                  { msg: "Password reset token is invalid or has expired" }
                ]
              });
            }
            user.local.password = password;
            user.local.resetPasswordToken = undefined;
            user.local.resetPasswordExpires = undefined;
            user.save(err => {
              done(err, user);
            });
            return res.status(200).json(user);
          }
        );
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
};

exports.google = async (req, res) => {
  try {
    const token = generateLoginToken(req.user.id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.facebook = async (req, res) => {
  try {
    const token = generateLoginToken(req.user.id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
