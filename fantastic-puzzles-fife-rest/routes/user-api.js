const express = require('express');
const CryptoJS = require("crypto-js");
const router = express.Router();

// route for sending user back if the given access_token is correct
router.post('/me', function (req, res, next) {
    const access_token = req.body.access_token;
    const passphrase = "1LIONAUTH2";
    // decrypt the access_token
    const plaintext = JSON.parse(CryptoJS.AES.decrypt(access_token, passphrase).toString(CryptoJS.enc.Utf8));
    const user = {
        username: plaintext.username,
        origin: {
            name: "Fantastic Puzzles Fife",
            url: "https://cs3099user01.host.cs.st-andrews.ac.uk/",
            id: plaintext.username
        }
    };
    res.send(user);
});

module.exports = router;