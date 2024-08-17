const { TokenService } = require("../services");
const timeFormatter = require("../utils/timeFormatter");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    const user = await TokenService.tokenVerification(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!user) {
      return res.status(403).send({ message: "Forbidden Access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Please authenticate" });
  }
};

module.exports = verifyToken;
