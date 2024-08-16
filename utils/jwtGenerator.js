const jwt = require("jsonwebtoken");

const jwtGenerator = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = jwtGenerator;
