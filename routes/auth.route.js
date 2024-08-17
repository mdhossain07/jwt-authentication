const express = require("express");
const { AuthController } = require("../controllers");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/login", verifyToken, AuthController.login);
router.post("/refresh-tokens", AuthController.refreshTokens);

module.exports = router;
