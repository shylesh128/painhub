const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const cCodeCompiler = catchAsync(async (req, res, next) => {
  const code = req.body;

  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Code is a required field.",
    });
  }

  const cFilePath = path.join(__dirname, "TempCFile.c");
  const executablePath = path.join(__dirname, "TempCFile");

  // Write C code to a temporary file
  fs.writeFileSync(cFilePath, code);

  // Compile C code
  exec(
    `gcc ${cFilePath} -o ${executablePath}`,
    (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        // Compilation error
        fs.unlinkSync(cFilePath); // Remove the temporary C file
        return res.status(500).send(compileStderr);
      }

      // Execute compiled C code
      exec(`${executablePath}`, (runError, runStdout, runStderr) => {
        // Remove the temporary C files
        fs.unlinkSync(cFilePath);
        fs.unlinkSync(executablePath);

        if (runError) {
          // Runtime error
          return res.status(500).send(runStderr);
        }

        res.send(runStdout);
      });
    }
  );
});

module.exports = { cCodeCompiler };
