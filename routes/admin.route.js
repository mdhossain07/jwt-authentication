const express = require("express");
const { AdminController } = require("../controllers");

const router = express.Router();

router.post("/register", AdminController.registerAdmin);

module.exports = router;
