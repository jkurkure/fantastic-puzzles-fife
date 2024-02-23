const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');

// route for sending back an AES encrypted code from a request body sent from the front end.
// this is used for generating the supergroup code
router.post('/encrypt', function (req, res, next) {
    const passphrase = "12TIG5ER34";
    const code = CryptoJS.AES.encrypt(JSON.stringify(req.body), passphrase).toString();
    res.send({code: code});
});

module.exports = router;
