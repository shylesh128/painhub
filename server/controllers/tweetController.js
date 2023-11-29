const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Tweet = require("../models/tweetModel");

const createTweet = catchAsync(async (req, res, next) => {
  const { tweet, name, email } = req.body;

  if (!tweet || !name || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Tweet, name, and email are required fields.",
    });
  }

  const newTweet = await Tweet.create({
    tweet,
    name,
    email,
  });

  res.status(201).json({
    status: "success",
    data: {
      tweet: newTweet,
    },
  });
});

const getAllTweets = catchAsync(async (req, res, next) => {
  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const tweets = await Tweet.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    data: {
      tweets,
    },
  });
});

module.exports = { createTweet, getAllTweets };
