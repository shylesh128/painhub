const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { exec } = require("child_process");

const fs = require("fs");
const path = require("path");

const pythoncodeComplier = catchAsync(async (req, res, next) => {
  const code = req.body;

  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Code is a required field.",
    });
  }

  const scriptPath = path.join(__dirname, "tempScript.py");

  // Write code to a temporary script file
  fs.writeFileSync(scriptPath, code);

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    // Remove the temporary script file
    fs.unlinkSync(scriptPath);

    if (error) {
      return res.status(500).send(stderr);
    }

    res.send(stdout);
  });
});

module.exports = { pythoncodeComplier };
