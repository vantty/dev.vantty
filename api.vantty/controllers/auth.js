const { generateLoginToken } = require("../helpers");
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
    return res.status(500).json({
      message: "Server Error"
    });
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
      return res.status(403).json({ message: "User already exist" });
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
    return res.status(500).json({
      message: "Server Error"
    });
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
    return res.status(500).json({
      message: "Server Error"
    });
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
    return res.status(500).json({
      message: "Server Error"
    });
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

exports.forgot = async (req, res) => {
  try {
    const {
      body: { email },
      headers: { origin: uri }
    } = req;
    const user = await userService.getByField({ email });
    if (!user) {
      return res.status(403).json({
        message: "User does not exist. Please check your email address"
      });
    }
    const { id, firstName } = user;

    const result = await authService.forgot(id, email, firstName, uri);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.reset = async (req, res) => {
  try {
    const {
      body: { token, password }
    } = req;
    const user = await userService.getByField({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(403).json({
        message: "Password reset token has expired"
      });
    }
    const { id } = user;
    const result = await authService.reset(id, password);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.google = async (req, res) => {
  try {
    const token = generateLoginToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.facebook = async (req, res) => {
  try {
    const token = generateLoginToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
