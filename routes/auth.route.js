const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  const { name, email, password } = req.body;

  console.log("name", name, "email", email, "password", password);

  res.status(200).send({ message: "POST request done" });
});

module.exports = router;
