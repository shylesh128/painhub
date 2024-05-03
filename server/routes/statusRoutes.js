const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const {
  addUser,
  deleteUser,
  viewUser,
  editUser,
  addUsers,
  deleteAllUsers,
  getAllUser,
} = require("../controllers/userController");
const { login, userByToken } = require("../controllers/loginController");
const {
  getAllFeedback,
  createFeedback,
} = require("../controllers/feedbackController");
const { getAllTweets, createTweet } = require("../controllers/tweetController");
const { pythoncodeComplier } = require("../controllers/pythonController");
const { javacodeCompiler } = require("../controllers/JavaController");
const { cCodeCompiler } = require("../controllers/cProgController");
const { phpCodeExecutor } = require("../controllers/phpController");
const {
  generateAltText,
  geminiAIChat,
} = require("../controllers/GeminiController");
const { createNewPain, getAllPains } = require("../controllers/painController");
const authMiddleware = require("../middlewares/authmiddleware");
const {
  createThread,
  getAllthreads,
} = require("../controllers/threadController");

router.get("/api/status", statusController.getStatus);

router.post("/api/addUser", addUser);
router.delete("/api/user/:id", deleteUser);
router.put("/api/editUser/:id", editUser);

router.post("/api/addUsers", addUsers);
router.delete("/api/users", deleteAllUsers);

router.post("/api/login", login);

router.get("/api/feedback", getAllFeedback);
router.post("/api/feedback", createFeedback);

router.get("/api/tweet", getAllTweets);
router.post("/api/tweet", createTweet);

router.post("/api/isLoggedIn", userByToken);

router.post("/api/python", pythoncodeComplier);
router.post("/api/c", cCodeCompiler);

router.post("/api/alttext/:apikey", generateAltText);
router.post("/api/aichat/:apikey", geminiAIChat);

router.post("/api/createPain", authMiddleware, createNewPain);
router.get("/api/pain", authMiddleware, getAllPains);

router.post("/api/thread", authMiddleware, createThread);
router.get("/api/thread/:painId", getAllthreads);

router.get("/api/users", authMiddleware, getAllUser);

module.exports = router;
