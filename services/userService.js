const User = require("../model/User");
const bcrypt = require("bcrypt");
const emailValidator = require("../utils/emailValidator");
const mongoose = require("mongoose");

const getAll = async () => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) throw new Error("Some things went wrong");
  return userList;
};
const createUser = async (data) => {
  if (!data.email || !data.password || !data.phone || !data.name)
    throw new Error("Name,phone,email and password is required");
  const isValid = emailValidator(data.email);
  if (!isValid) throw new Error("Email is invalid");
  const isRegisterBefore = await User.findOne({ email: data.email });
  if (isRegisterBefore) throw new Error("Email is allready used");
  const hashedPwd = await bcrypt.hash(data.password, 10);
  const result = await User.create({
    name: data.name,
    email: data.email,
    passwordHash: hashedPwd,
    street: data.street,
    apartment: data.apartment,
    city: data.city,
    zip: data.zip,
    country: data.country,
    phone: data.phone,
    isAdmin: data.isAdmin,
  });
  return result;
};
const getUserById = async (id) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) throw new Error("Id is invalid");

  const user = await User.findById(id).select("-passwordHash");
  if (!user) throw new Error("User not found");
  return user;
};
const changePassword = async (data) => {
  if (!data.id || !data.password || !data.oldPassword) {
    throw new Error("Id,password and oldPassword is required");
  }
  const isValid = mongoose.isValidObjectId(data.id);
  if (!isValid) throw new Error("Id is invalid");
  const user = await User.findById(data.id).select("id passwordHash");
  if (!user) throw new Error("User not found");
  const match = await bcrypt.compare(data.oldPassword, user.passwordHash);
  console.log(match);
  if (!match) throw new Error("Old password is wrong !");
  user.passwordHash = await bcrypt.hash(data.password, 10);
  const result = user.save();
  return result && { message: "Password changed" };
};
const getUserCount = async () => {
  const count = await User.countDocuments();
  if (!count) throw new Error("Some things went wrong");
  return count;
};
const updateUser = async (data) => {
  if (!data.id || !data.email || !data.phone || !data.name)
    throw new Error("Id,name,phone,email and password is required");
  if (!mongoose.isValidObjectId(data.id) || !emailValidator(data.email))
    throw new Error("Id or Email is invalid");

  const user = await User.findByIdAndUpdate(data.id);
  if (!user) throw new Error("User not found");

  const result = await User.findByIdAndUpdate(data.id, {
    name: data.name,
    email: data.email,
    street: data.street,
    apartment: data.apartment,
    city: data.city,
    zip: data.zip,
    country: data.country,
    phone: data.phone,
    isAdmin: data.isAdmin,
  });
  return result;
};
module.exports = {
  getAll,
  createUser,
  getUserById,
  changePassword,
  getUserCount,
  updateUser,
};
