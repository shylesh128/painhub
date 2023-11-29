const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const appError = require("../utils/appError");

const jwt = require("jsonwebtoken");

const secretKey =
  "746d3de964867c223d8a97948f22987e66566d7b73e65f0b23221ac8174b986e";

const login = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User not found.",
    });
  }

  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: "9999999d",
  });

  res.status(200).json({
    status: "success",
    message: "User login successfully.",
    token: token,
    user: user,
  });
});

const userByToken = catchAsync(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Authorization header is missing or invalid.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findById(decoded.userId);

    res.status(200).json({
      status: "success",
      message: "User fetched successfully.",
      user: user,
    });
  } catch (error) {
    // Handle token verification errors
    console.error("Token verification failed:", error);
    res.status(401).json({
      status: "fail",
      message: "Token verification failed.",
    });
  }
});

module.exports = { login, userByToken };
