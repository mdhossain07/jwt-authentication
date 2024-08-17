const { AdminService } = require("../services");
const { adminValidation } = require("../validations");
const exclude = require("../utils/exclude");

class AdminController {
  getAdminByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const admin = AdminService.getAdminByEmail(email);
      res.status(200).send({ success: true, data: admin });
    } catch (err) {
      res.status(404).send({ success: false, details: err.message });
    }
  };

  registerAdmin = async (req, res) => {
    try {
      await adminValidation.register.body.validateAsync(req.body, {
        abortEarly: false,
      });
      const newAdmin = await AdminService.registerAdmin(req.body);
      res
        .status(200)
        .send({
          mesage: "Admin Created",
          data: exclude(newAdmin, ["password"]),
        });
    } catch (error) {
      res.status(400).send({
        message: "Admin Create Failed!",
        details: error.message,
      });
    }
  };
}

module.exports = new AdminController();
