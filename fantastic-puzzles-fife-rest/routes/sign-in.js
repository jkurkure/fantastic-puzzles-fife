const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// route for signing in in a user
router.post("/", (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.send({message: "There is no user registered with this username!"});
        } else {
            // check that the password received matched the hashed password in the database
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                }
                if (isMatch) {
                    // if successful send a jwt to front-end
                    jwt.sign({username: user.username}, 'secretKeyGroup01', (err, token) => {
                        res.send({token: token, message: "SUCCESSFUL SIGN IN"});
                    })
                } else {
                    return res.send({message: 'The password is incorrect'});
                }
            });
        }
    });
});

module.exports = router;
