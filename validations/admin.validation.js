const Joi = require("joi");

const register = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().messages({
        "any.required": "Name is required",
      }),
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
        .email()
        .required()
        .messages({
          "string.pattern.base": "Invalid email format",
          "any.required": "Email is required",
        }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password should be 6 characters long",
        "any.required": "Password is required",
      }),
      confirmPassword: Joi.ref("password"),
    })
    .with("password", "confirmPassword")
    .messages({
      "any.only": "Password didn't match",
    }),
};

module.exports = { register };
