const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const getToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
const loginUser = async (data) => {
  if (!data.email || !data.password)
    throw new Error("Email and password is required");
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("User not found");
  const match = await bcrypt.compare(data.password, user.passwordHash);
  if (!match) throw new Error("User not found");
  return { accessToken: getToken(user._id, user.isAdmin) };
};
module.exports = {
  getToken,
  loginUser,
};
