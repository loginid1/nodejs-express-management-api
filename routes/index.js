const express = require("express");
const users = require("./users")
const usersByUsername = require("./usersByUsername")
const router = express.Router();

router.use("/users", users);
router.use("/users/username", usersByUsername);

module.exports = router;
