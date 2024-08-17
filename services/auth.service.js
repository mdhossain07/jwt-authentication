const isPaswordMatch = require("../utils/isPasswordMatch");
const { getAdminByEmail } = require("./admin.service");
const exclude = require("../utils/exclude");
const TokenService = require("./tokens.service");

class AuthService {
  loginUserWithEmailAndPassword = async (email, password) => {
    const user = await getAdminByEmail(email);

    if (!user || !(await isPaswordMatch(password, user?.password))) {
      throw new Error("Invalid email or password");
    }
    return exclude(user, ["password", "created_at", "updated_at"]);
  };

  refreshAuth = async (refreshToken) => {
    try {
      const decode = await TokenService.tokenVerification(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      return TokenService.generateAuthTokens(decode.user);
    } catch (error) {
      throw new Error("Please Authenticate");
    }
  };
}

module.exports = new AuthService();
