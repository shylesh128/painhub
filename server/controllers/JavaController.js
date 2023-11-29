const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const javacodeCompiler = catchAsync(async (req, res, next) => {
  const code = req.body;

  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Code is a required field.",
    });
  }

  const javaFilePath = path.join(__dirname, "TempJavaFile.java");
  const classFilePath = path.join(__dirname, "TempJavaFile.class");

  // Write Java code to a temporary file
  fs.writeFileSync(javaFilePath, code);

  // Compile Java code
  exec(
    `javac ${javaFilePath}`,
    (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        // Compilation error
        fs.unlinkSync(javaFilePath); // Remove the temporary Java file
        return res.status(500).send(compileStderr);
      }

      // Execute compiled Java code
      exec(
        `java -cp ${__dirname} TempJavaFile`,
        (runError, runStdout, runStderr) => {
          // Remove the temporary Java files
          fs.unlinkSync(javaFilePath);
          fs.unlinkSync(classFilePath);

          if (runError) {
            // Runtime error
            return res.status(500).send(runStderr);
          }

          res.send(runStdout);
        }
      );
    }
  );
});

module.exports = { javacodeCompiler };
