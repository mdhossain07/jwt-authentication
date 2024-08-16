const Joi = require("joi");

const validate = (schema) => async (req, res, next) => {
  const { value, error } = Joi.compile(schema)
    .prefs({
      errors: { label: "key" },
      abortEarly: false,
    })
    .validate(schema);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  Object.assign(req, value);
  return next();
  //   const { error } = Joi.compile(schema).validate(req.body, schema, {
  //     abortEarly: false,
  //   });
  //   //   const { error } = Joi.validate(req.body, schema, { abortEarly: false });
  //   if (error) {
  //     return res.status(400).send({ error: error.details[0].message });
  //   }
  //   next();
};

module.exports = validate;
