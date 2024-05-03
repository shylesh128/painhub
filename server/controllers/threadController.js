const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Thread = require("../models/threadModel");

const createThread = catchAsync(async (req, res, next) => {
  const { thread, painId } = req.body;

  if (!thread || !painId) {
    return res.status(400).json({
      status: "fail",
      message: "thread, name, and email are required fields.",
    });
  }

  const newthread = await Thread.create({
    thread,
    user: req.user._id,
    painId,
  });

  res.status(201).json({
    status: "success",
    data: {
      thread: newthread,
    },
  });
});

const getAllthreads = catchAsync(async (req, res, next) => {
  const { painId } = req.params;

  // Query for threads with the specified painId
  const threads = await Thread.find({ painId }).sort({ timeStamp: -1 });

  res.status(200).json({
    status: "success",
    data: {
      threads,
    },
  });
});

module.exports = { createThread, getAllthreads };
