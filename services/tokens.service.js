const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

class TokenService {
  generateToken = (payload, secret, expiration) => {
    return jwt.sign({ user: payload }, secret, {
      expiresIn: expiration,
    });
  };

  tokenVerification = (token, secret) => {
    return jwt.verify(token, secret);
  };

  generateAuthTokens = async (payload) => {
    const accessTokenExpiration = dayjs
      .duration(process.env.ACCESS_TOKEN_EXPIRATION, "minutes")
      .asSeconds();

    const refreshTokenExpiration = dayjs
      .duration(process.env.REFRESH_TOKEN_EXPIRATION, "days")
      .asSeconds();
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
