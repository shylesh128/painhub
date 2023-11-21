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

router.get("/api/status", statusController.getStatus);

router.post("/api/addUser", addUser);
router.delete("/api/user/:id", deleteUser);
router.get("/api/users", viewUser);
router.put("/api/editUser/:id", editUser);

router.post("/api/addUsers", addUsers);
router.delete("/api/users", deleteAllUsers);

module.exports = router;
