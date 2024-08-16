const isPaswordMatch = require("../utils/isPasswordMatch");
const { getAdminByEmail } = require("./admin.service");
const exclude = require("../utils/exclude");

class AuthService {
  loginUserWithEmailAndPassword = async (email, password) => {
    const user = await getAdminByEmail(email);

    if (!user || !(await isPaswordMatch(password, user?.password))) {
      throw new Error("Invalid email or password");
    }
    return exclude(user[0], ["password"]);
  };
}

module.exports = new AuthService();
