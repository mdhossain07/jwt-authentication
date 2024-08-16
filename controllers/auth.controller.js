const { AuthService } = require("../services");
const jwtGenerator = require("../utils/jwtGenerator");
const { authValidation } = require("../validations");

class AuthController {
  loginUserWithEmailAndPassword = async (req, res) => {
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

      // Generate JWT token
      const token = jwtGenerator(user?.email);

      res.status(200).send({ success: true, token });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

module.exports = new AuthController();
