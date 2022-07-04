const express = require("express");

const router = express.Router();

const {
  loginUser,
  createUser,
  changePassword,
} = require("../controllers/users.controller");

router.post("/login", loginUser);
router.post("/register", createUser);
router.patch("/change-password", changePassword);

module.exports = router;
