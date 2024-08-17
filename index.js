try {
  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const port = process.env.PORT || 8001;
  const routes = require("./routes");

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1", routes);

  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });

  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
    console.info("Press Ctrl+C to quit.");
  });
} catch (error) {
  console.error(error);
}
