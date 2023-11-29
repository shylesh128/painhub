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
} = require("../controllers/userController");
const { login, userByToken } = require("../controllers/loginController");
const {
  getAllFeedback,
  createFeedback,
} = require("../controllers/feedbackController");
const { getAllTweets, createTweet } = require("../controllers/tweetController");
const { pythoncodeComplier } = require("../controllers/pythonController");
const { javacodeCompiler } = require("../controllers/JavaController");

router.get("/api/status", statusController.getStatus);

router.post("/api/addUser", addUser);
router.delete("/api/user/:id", deleteUser);
router.get("/api/users", viewUser);
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
module.exports = router;
