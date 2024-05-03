const UserModel = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const authMiddleware = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Invalid token", 401));
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await UserModel.findById(decoded.id || decoded.userId);

    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
});

module.exports = authMiddleware;
