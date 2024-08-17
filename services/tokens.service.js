const jwt = require("jsonwebtoken");
const timeFormatter = require("../utils/timeFormatter");

class TokenService {
  generateToken = (payload, secret, expiration) => {
    return jwt.sign({ user: payload }, secret, {
      expiresIn: expiration,
    });
  };

  tokenVerification = async (token, secret) => {
    const payload = await jwt.verify(token, secret);
    console.log("payload", payload);
    return payload.user;
  };

  generateAuthTokens = async (payload) => {
    const accessTokenExpiration = timeFormatter.accessTokenExpiration(
      process.env.ACCESS_TOKEN_EXPIRATION
    );

    const refreshTokenExpiration = timeFormatter.refreshTokenExpiration(
      process.env.REFRESH_TOKEN_EXPIRATION
    );
    const accessToken = this.generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    const refreshToken = this.generateToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    return {
      access: { accessToken, expiresIn: accessTokenExpiration },
      refresh: { refreshToken, expiresIn: refreshTokenExpiration },
    };
  };
}

module.exports = new TokenService();
