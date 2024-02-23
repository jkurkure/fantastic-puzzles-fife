const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {signupValidator} = require("../controllers/sign-up-validator");
const {validationResult} = require("express-validator");

// route for signing up a user
router.post("/", signupValidator, async (req, res, next) => {
    try {
        // check if the validations stage passed
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.send({message: validationErrors.array()});
        }

        // hash the password using bcrypt with a salt
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        User.findOne({username: req.body.username}, (err, user) => {
            if (user) {
                res.send({message:"This username is already registered!"});
            } else {
                User.findOne({email: req.body.email}, (err, email) => {
                    if (email) {
                        res.send({message:"This email address is already registered!"});
                    } else {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedPassword
                        });

                        // save the user in the database
                        user.save(err => {
                            if (err) {
                                return next(err);
                            }
                        });
                        res.send({message: "SUCCESSFUL REGISTRATION"});
                    }
                })
            }
        });
    } catch (error) {
        res.send({message:"Error occurred while registering user"});
    }
});

module.exports = router;