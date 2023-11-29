const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const phpCodeExecutor = catchAsync(async (req, res, next) => {
  const code = req.body;

  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Code is a required field.",
    });
  }

  const phpFilePath = path.join(__dirname, "TempPHPFile.php");

  // Write PHP code to a temporary file
  fs.writeFileSync(phpFilePath, code);

  // Execute PHP code
  exec(`php ${phpFilePath}`, (phpError, phpStdout, phpStderr) => {
    // Remove the temporary PHP file
    fs.unlinkSync(phpFilePath);

    if (phpError) {
      // PHP execution error
      return res.status(500).send(phpStderr);
    }

    res.send(phpStdout);
  });
});

module.exports = { phpCodeExecutor };
