const userService = require("../services/user");
const emailService = require("../services/email");
const { generateLoginToken } = require("../helpers");

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

exports.getAll = async (req, res) => {
  try {
    const result = await userService.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const {
      user: { id },
      body: fields
    } = req;
    const result = await userService.update(id, fields, "$set");
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
    const resMail = await userService.sendConfirmationEmail(result, uri);
    if (resMail === "202Accepted") {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({
        message: "Message not sent"
      });
    }
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
    const result = await userService.sendConfirmationEmail(user, uri);
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
    const token = await userService.register(registerToken);
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
      user: { id, message }
    } = req;
    if (id) {
      const token = generateLoginToken(id);
      res.status(200).json({ token });
    } else {
      return res.status(403).json({
        message: message
      });
    }
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
    const result = await userService.forgot(id, email, firstName, uri);
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
    const result = await userService.reset(id, password);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.google = async (req, res) => {
  try {
    const {
      user: {
        register,
        newUser: { id },
        message
      }
    } = req;
    if (message) {
      return res.status(401).json({
        message: message
      });
    }
    if (id) {
      const token = generateLoginToken(id);
      res.status(200).json({ token, register });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.facebook = async (req, res) => {
  try {
    const {
      user: {
        register,
        newUser: { id },
        message
      }
    } = req;
    if (message) {
      return res.status(401).json({
        message: message
      });
    }
    if (id) {
      const token = generateLoginToken(id);
      res.status(200).json({ token, register });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.help = async (req, res) => {
  try {
    const {
      body: { email, issue, text }
    } = req;
    const result = await emailService.sendHelp(email, issue, text);
    if (result === "202Accepted") {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({
        message: "Message not sent"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.test = (req, res) => {
  try {
    console.log("result", req.body);
    return res.status(200).json(req.body);
  } catch (error) {
    console.log("ERROR", error);
  }
};
