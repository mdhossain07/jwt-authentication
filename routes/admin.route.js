const express = require("express");
const supabase = require("../supabase");
const bcrypt = require("bcrypt");
const { adminValidation } = require("../validations");
const exclude = require("../utils/exclude");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await adminValidation.register.body.validateAsync(req.body, {
      abortEarly: false,
    });
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("admins")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      res.status(400).send({ message: error.message });
    }
    res.status(200).send({ mesage: "Admin Created", data: exclude(data[0]) });
  } catch (error) {
    res.status(400).send({
      message: "Validation Failed!",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  let { data: admins, error } = await supabase.from("admins").select("*");
  if (error) {
    res.status(400).send({ message: error.message });
  }
  res.status(200).send(admins);
});

module.exports = router;
