const bcrypt = require("bcrypt");

const isPaswordMatch = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};

module.exports = isPaswordMatch;
