const express = require("express");
const handlers = require("../handlers/usersByUsername")
const router = express.Router();

router.put("/:username", handlers.updateUserByUsername.bind(handlers))
router.put("/:username/activate", handlers.activateUserByUsername.bind(handlers))
router.put("/:username/deactivate", handlers.deactivateUserByUsername.bind(handlers))
router.delete("/:username", handlers.deleteUserByUsername.bind(handlers))
router.post("/:username/email-verification/dispatch", handlers.dispatchEmailVerification.bind(handlers))

module.exports = router;