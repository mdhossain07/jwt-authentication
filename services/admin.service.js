const bcrypt = require("bcrypt");
const supabase = require("../supabase");

class AdminService {
  async getAdminByEmail(email) {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }

    return admin[0];
  }

  async registerAdmin(data) {
    const { name, email, password } = data;
    const isAdminExist = await this.getAdminByEmail(email);

    if (isAdminExist) {
      throw new Error("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: admin, error } = await supabase
      .from("admins")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return admin[0];
  }
}

module.exports = new AdminService();
