const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Pain = require("../models/painModel");
const validator = require("validator");

const createNewPain = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const user = req.user;

  const sanitizedName = validator.trim(name);

  const existingPain = await Pain.findOne({ name: sanitizedName });
  if (existingPain) {
    return next(new appError("Pain already exists", 400));
  }

  if (!validator.isLength(sanitizedName, { min: 6, max: 12 })) {
    return next(new appError("Name must be between 6 and 12 characters", 400));
  }

  if (!/^\S{6,}$/.test(sanitizedName)) {
    return next(
      new appError("Name must contain at least 6 non-space characters", 400)
    );
  }

  const newPain = await Pain.create({
    name: sanitizedName,
    description: description,
    creator: user.email,
  });

  res.status(200).json({
    status: "success",
    data: {
      newPain,
    },
  });
});

const getAllPains = catchAsync(async (req, res, next) => {
  const pains = await Pain.find();

  res.status(200).json({
    status: "success",
    data: pains,
  });
});

module.exports = { createNewPain, getAllPains };
