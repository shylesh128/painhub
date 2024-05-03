const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const appError = require("../utils/appError");

const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "User ID is required.",
    });
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully.",
  });
});

const viewUser = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const queryString = req.query.query;

  let query = {};
  if (queryString) {
    const regexQuery = { $regex: new RegExp(queryString, "i") };
    query = {
      $or: [{ name: regexQuery }, { email: regexQuery }],
    };
  }

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: {
      users,
      count: users.length,
    },
  });
});

const editUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({
      status: "fail",
      message: "User ID, name, and email are required fields.",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      status: "fail",
      message: "User not found.",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const addUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Name and email are required fields.",
    });
  }

  try {
    const newUser = await User.create({ name, email });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    next(new appError(e.message, 401));
  }
});

const addUsers = catchAsync(async (req, res, next) => {
  const usersData = req.body;

  // Validate if usersData is an array
  if (!Array.isArray(usersData)) {
    return res.status(400).json({
      status: "fail",
      message: "An array of users is required.",
    });
  }

  // Validate each user in the array
  const invalidUsers = usersData.filter((user) => !user.name || !user.email);

  if (invalidUsers.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: "Name and email are required fields for all users.",
    });
  }

  // Set a default role if none is provided
  const usersWithRole = usersData.map((user) => ({
    ...user,
  }));

  // Create many users

  try {
    const newUsers = await User.insertMany(usersWithRole);

    res.status(201).json({
      status: "success",
      data: {
        users: newUsers,
      },
    });
  } catch (e) {
    next(new appError(e.message, 401));
  }
});

const deleteAllUsers = catchAsync(async (req, res, next) => {
  // Delete all users
  await User.deleteMany();

  res.status(200).json({
    status: "success",
    message: "All users deleted successfully.",
  });
});

const getAllUser = catchAsync(async (req, res, next) => {
  // Specify which fields to exclude in the projection
  const users = await User.find({}, { email: 0, createdAt: 0 });

  res.status(200).json({
    users,
  });
});

module.exports = {
  addUser,
  deleteUser,
  viewUser,
  editUser,
  addUsers,
  deleteAllUsers,
  getAllUser,
};
