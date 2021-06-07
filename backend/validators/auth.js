const { body } = require("express-validator");

const registerValidationRules = () => [
  body("userName").not().isEmpty().withMessage("User Name is required"),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must not be less than 6 characters"),
];

const loginValidationRules = () => [
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address provided"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
