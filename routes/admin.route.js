const express = require("express");
const supabase = require("../supabase/index");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const { data, error } = await supabase
    .from("admins")
    .insert([
      {
        name,
        email,
        password,
      },
    ])
    .select();

  if (error) {
    res.status(500).send({ message: error.message });
  }
  res.status(200).send({ mesage: "Admin Created", data });
});

router.get("/", async (req, res) => {
  let { data: admins, error } = await supabase.from("admins").select("*");
  if (error) {
    res.status(500).send({ message: error.message });
  }
  res.status(200).send(admins);
});

module.exports = router;
