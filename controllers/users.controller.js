const HttpError = require("../utils/HttpError");
const User = require("../models/user-models");
const { uuid } = require("uuidv4");

const { validationResult } = require("express-validator");

const { returnObject, returnArray } = require("../utils/result.js");

const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError("Fetching users failed, please try again", 500);
    return next(error);
  }

  res.json({
    message: "Hello from from all data",
    data: returnArray(users),
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email, password });
  } catch (err) {
    const error = new HttpError(
      "Incorrect username or password. Please try again!",
      500
    );
    return next(error);
  }

  res.json({
    message: "Login successful",
    data: returnObject(user),
  });
};

const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    roles,
    studentInformation,
    parentInformation,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: uuid(),
    roles,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, try again", 500);
    return next(error);
  }

  res.status(201).json({
    message: "User created successfully",
    data: createdUser,
  });
};

const changePassword = async (req, res, next) => {
  const { id } = req.body;
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  try {
    req.body.hasChangedPasswords = true;
    Object.assign(user, req.body);
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Password changed.",
    data: user,
    status: 200,
  });
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  changePassword,
};
