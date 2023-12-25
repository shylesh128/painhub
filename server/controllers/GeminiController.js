const formidable = require("formidable");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const path = require("path");
const { generateAltTextGoogle, geminiChat } = require("../utils/service");

const generateAltText = catchAsync(async (req, res, next) => {
  const apiKey = req.params.apikey;

  const uploadDir = path.join(__dirname, "images");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = new formidable.IncomingForm();

  form.uploadDir = uploadDir;

  form.on("fileBegin", (name, file) => {
    file.filepath = path.join(__dirname, "images", `${file.originalFilename}`);
  });
  form.on("file", async (formname, file) => {
    try {
      const altText = await generateAltTextGoogle(file.filepath, apiKey);

      res.json({ file: file, altText: altText });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload the image to S3" });
    }
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
  });
});

const geminiAIChat = catchAsync(async (req, res, next) => {
  const apiKey = req.params.apikey;
  const data = req.body;

  const chatResponse = await geminiChat(apiKey, data.query);

  res.status(200).json({
    result: chatResponse,
  });
});

module.exports = { generateAltText, geminiAIChat };
