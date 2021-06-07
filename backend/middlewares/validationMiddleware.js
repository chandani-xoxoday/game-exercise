const { validationResult } = require("express-validator");

// Middleware that applies express validator on the validation rules.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  const errorResponse = res.status(400).json({
    ...{ errors: extractedErrors },
  });
  return errorResponse;
};

module.exports = {
  validate,
};
