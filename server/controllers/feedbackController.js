const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Feedback = require("../models/feedbackModel");

const createFeedback = catchAsync(async (req, res, next) => {
  const { message, name, email } = req.body;

  if (!message || !name || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Message, name, and email are required fields.",
    });
  }

  // Check if the feedback already exists based on email and message
  const existingFeedback = await Feedback.findOne({
    email,
    message,
  });

  if (existingFeedback) {
    return res.status(400).json({
      status: "fail",
      message: "You have already submitted this feedback.",
    });
  }

  const feedback = await Feedback.create({
    message,
    name,
    email,
  });

  res.status(201).json({
    status: "success",
    data: {
      feedback,
    },
  });
});

const getAllFeedback = catchAsync(async (req, res, next) => {
  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const feedback = await Feedback.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    data: {
      feedback,
    },
  });
});

module.exports = { createFeedback, getAllFeedback };
