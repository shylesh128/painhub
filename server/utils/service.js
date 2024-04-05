const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");
const mongoose = require("mongoose");

const generateAltTextGoogle = async (filePath, apiKey) => {
  const MODEL_NAME = "gemini-pro-vision";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  if (!fs.existsSync(filePath)) {
    throw new Error("Could not find the image file at the specified path.");
  }

  const parts = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      },
    },
    { text: "Create an accurate alt text for this Image." },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
  return response.text();
};

const geminiChat = async (apiKey, promp) => {
  const MODEL_NAME = "gemini-pro";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [{ text: `${promp}` }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
  return response.text();
};

function mongoConnect() {
  const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
  mongoose
    .connect(DB)
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  generateAltTextGoogle,
  geminiChat,
  mongoConnect,
};

// // Example usage:
// const filePath = "./public/images/rise-course-image.jpg";
// const apiKey = "your_api_key_here";

// generateAltText(filePath, apiKey);
