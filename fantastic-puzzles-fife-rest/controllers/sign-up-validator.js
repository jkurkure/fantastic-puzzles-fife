const {body} = require('express-validator');

// use express validator to check if the registration data sent by the sign up form is valid
exports.signupValidator = [
    body('firstName').exists().isString().isLength({min: 1, max: 100}).bail(),
    body('lastName').exists().isString().isLength({min: 1, max: 100}).bail(),
    body('username').exists().isString().isLength({min: 6, max: 100}).bail(),
    body('email').exists().isEmail().isLength({min: 3, max: 100}).bail(),
    body('password').exists().isString().isLength({min: 8, max: 100}).bail(),
];