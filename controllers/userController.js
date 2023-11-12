const userService = require("../services/userService");

const getAll = async (req, res) => {
  try {
    const result = await userService.getAll();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(404).json({ message: "id is required" });
    const result = await userService.getUserById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  register,
  getUser,
};
