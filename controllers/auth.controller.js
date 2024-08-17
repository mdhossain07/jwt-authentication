const { AuthService, TokenService } = require("../services");
const { authValidation } = require("../validations");

class AuthController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate user input
      await authValidation.login.body.validateAsync(req.body, {
        abortEarly: false,
      });

      // Authenticate user
      const user = await AuthService.loginUserWithEmailAndPassword(
        email,
        password
      );

      const tokens = await TokenService.generateAuthTokens(user?.email);

      await AuthService.saveRefreshToken(email, tokens.refresh.refreshToken);

      res.status(200).send({ succees: true, user, tokens });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  refreshTokens = async (req, res) => {
    try {
      await authValidation.refreshTokens.body.validateAsync(req.body, {
        abortEarly: false,
      });

      const tokens = await AuthService.refreshAuth(req.body.refreshToken);
      res.status(200).send({ ...tokens });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  logOut = async (req, res) => {
    try {
      const { email } = req.body;
      await AuthService.logOutUser(email);
      res.send({ success: true, message: "Logged Out!" });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };
}

module.exports = new AuthController();
