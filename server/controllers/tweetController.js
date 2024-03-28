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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalTweets = await Tweet.countDocuments();

  const tweets = await Tweet.find()
    .sort({ timeStamp: -1 })
    .skip(skip)
    .limit(limit);

  const nextPage = totalTweets > skip + limit ? page + 1 : null;

  res.status(200).json({
    status: "success",
    data: {
      tweets,
      pageInfo: {
        totalTweets,
        currentPage: page,
        nextPage,
      },
    },
  });
});

module.exports = { createTweet, getAllTweets };
