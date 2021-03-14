const express = require("express");
const handlers = require("../handlers/users")
const router = express.Router();

router.put("/:user_id", handlers.updateUser.bind(handlers))
router.put("/:user_id/activate", handlers.activateUser.bind(handlers))
router.put("/:user_id/deactivate", handlers.deactivateUser.bind(handlers))
router.delete("/:user_id", handlers.deleteUser.bind(handlers))
router.post("/:user_id/email-verification/dispatch", handlers.dispatchEmailVerification.bind(handlers))

module.exports = router;