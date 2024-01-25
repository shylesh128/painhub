const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");

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
    {
      text: "Write an  alternative text description for images provided to you. Note that the text description needs to be an alternative accommodation for a visually impaired users providing them with all the information that a visually abled users can extract and nothing more. This will help us ensure that all users have a level-playing field. If text is present in the image, ensure that is also recognized and stated in the description.  Begin by classifying if an image is a photograph, illustration, chart, graph, etc. For each description, begin by identifying the type of image. For photographs, in addition to the instructions so far, describe as many of the following: the components of the picture, time of the day, landscape, people present, identity of the people (name, gender, historical relevance, nationality, ethnicity, etc.), objects, etc. For charts and graphs, describe the type of graph or chart, chart title, chart subtitle, axes labels, other labels, chart or graph scale, and elements of the chart or graph (including all important elements like curves, bars, lines, data points, etc.).",
    },
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

module.exports = {
  generateAltTextGoogle,
  geminiChat,
};

// // Example usage:
// const filePath = "./public/images/rise-course-image.jpg";
// const apiKey = "your_api_key_here";

// generateAltText(filePath, apiKey);
