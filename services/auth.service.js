const isPaswordMatch = require("../utils/isPasswordMatch");
const { getAdminByEmail } = require("./admin.service");
const exclude = require("../utils/exclude");
const TokenService = require("./tokens.service");
const supabase = require("../supabase");

class AuthService {
  saveRefreshToken = async (email, refreshToken) => {
    await supabase
      .from("admins")
      .update([{ refresh_token: refreshToken }])
      .eq("email", email);
  };

  loginUserWithEmailAndPassword = async (email, password) => {
    const user = await getAdminByEmail(email);

    if (!user || !(await isPaswordMatch(password, user?.password))) {
      throw new Error("Invalid email or password");
    }
    return exclude(user, [
      "password",
      "refresh_token",
      "created_at",
      "updated_at",
    ]);
  };

  refreshAuth = async (refreshToken) => {
    try {
      const user = await TokenService.tokenVerification(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      return TokenService.generateAuthTokens(user);
    } catch (error) {
      throw new Error("Please Authenticate");
    }
  };

  logOutUser = async (email) => {
    await supabase
      .from("admins")
      .update([{ refresh_token: null }])
      .eq("email", email);
  };
}

module.exports = new AuthService();
