const jwt = require("jsonwebtoken");

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
      access: { accessToken },
      refresh: { refreshToken },
    };
  };
}

module.exports = new TokenService();
