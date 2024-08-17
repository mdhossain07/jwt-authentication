const jwt = require("jsonwebtoken");

const jwtGenerator = (payload) => {
  const accessToken = jwt.sign(
    { user: payload },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    { user: payload },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );
  return { accessToken, refreshToken };
};

module.exports = jwtGenerator;
