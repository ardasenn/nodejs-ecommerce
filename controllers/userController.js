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
const userDetail = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(404).json({ message: "id is required" });
    const result = await userService.getUserById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const userUpdate = async (req, res) => {
  try {
    const result = await userService.updateUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const result = await userService.changePassword(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const userCount = async (req, res) => {
  try {
    const result = await userService.getUserCount();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  register,
  userDetail,
  changePassword,
  userCount,
  userUpdate,
};
