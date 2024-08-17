const { TokenService } = require("../services");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({ message: "Unauthorized Access" });
  }

  const decode = TokenService.tokenVerification(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decode) {
    res.status(403).send({ message: "Forbidden Access" });
  }

  req.user = decode.user;
  next();
};

module.exports = verifyToken;
