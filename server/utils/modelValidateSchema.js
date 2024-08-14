const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const schemas = {
  taskPOST: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    status: Joi.string().valid("active", "inactive").required(),
    contact: Joi.number().integer().required(),
  }),
};

module.exports = schemas;
