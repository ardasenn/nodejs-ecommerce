const User = require("../model/User");

const getAll = async (req, res) => {
  const userList = await User.find();
  if (!userList) res.status(500).json({ succes: false });
  res.send(userList);
};

module.exports = {
  getAll,
};
