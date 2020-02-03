const userService = require("../services/user");

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
