const express = require("express");
const handlers = require("../handlers/users")
const router = express.Router();

router.post("/retrieve", handlers.getUserProfileByUsername.bind(handlers))
router.post("/delete", handlers.deleteUserByUsername.bind(handlers))

router.put("/:user_id/activate", handlers.activateUser.bind(handlers))
router.put("/:user_id/deactivate", handlers.deactivateUser.bind(handlers))
router.delete("/:user_id", handlers.deleteUser.bind(handlers))
router.post("/:user_id/email-verification/dispatch", handlers.dispatchEmailVerification.bind(handlers))

// Disabled: until further notice
// router.put("/:user_id", handlers.updateUser.bind(handlers))

module.exports = router;