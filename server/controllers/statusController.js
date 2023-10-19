const catchAsync = require("../utils/catchAsync");

exports.getStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "API is working",
  });
});
