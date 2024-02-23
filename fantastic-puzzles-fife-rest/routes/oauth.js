const express = require('express');
const CryptoJS = require("crypto-js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post('/redirect/:client_id', async function (req, res, next) {
    const code = req.body.code;

    const clientToWebsiteMap = new Map([
        ["cs3099-g4", "https://cs3099user04.host.cs.st-andrews.ac.uk"],
        ["aces_g2", "https://cs3099user02.host.cs.st-andrews.ac.uk"],
        ["aces5", "https://cs3099user05.host.cs.st-andrews.ac.uk"],
        ["aces-eight", "https://cs3099user08.host.cs.st-andrews.ac.uk"],
        ["aces-g9", "https://cs3099user09.host.cs.st-andrews.ac.uk"],
        ["cs3099group03", "https://cs3099user03.host.cs.st-andrews.ac.uk"],
        ["g6", "https://cs3099user06.host.cs.st-andrews.ac.uk"],
        ["aces-g7", "https://cs3099user07.host.cs.st-andrews.ac.uk"]
    ]);

    const superGroupLink = clientToWebsiteMap.get(req.body.client_id);

    try {
        const res1 = await axios.post(superGroupLink + "/oauth/token", {
            client_id: "cs3099-g1",
            client_secret: process.env.CLIENT_SECRET,
            access_code: code
        });
        const access_token = res1.data.access_token;

        const res2 = await axios.post(superGroupLink + "/api/user/me", {
            access_token: access_token
        });
        const username = res2.data.username;

        jwt.sign({username: username}, 'secretKeyGroup01', (err, token) => {
            res.send({token: token, message: "SUCCESSFUL SIGN IN"});
        })
    } catch (error) {
        console.log(error);
    }
});


router.post('/token', function (req, res, next) {
    const access_code = req.body.access_code;
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;

    // check client secret and access code
    const clientToSecretCode = new Map([
        ["cs3099-g4", "2d39ab2a49b691f5cab7bbbdc46e2f01c67bb0921a816472f768f9bae3abb52b702708c8e72f54712254fd16e3b08ac30b877bf968305092d72b6b7e92397f6d1ed8d288eef8397a112d6decfbc99ed20186a62df26639e110c699e59f959aa9470147387e7807ba31af2cd01766d39d57a56aa94087246aa14d904da624401f"],
        ["aces_g2", "rv7zlvkfa30dr46v6y7fnwz8zvb9uijrqq5q1w2mlknoyyx8mpvollc1g6fhwsdpsweoq69dmbqu8bpkqak1ekw8ag2gdzvmjfr3ja5xlkmal8tlgu64csddow48711pq61je8ibt7fft53l4s94ik8wq1zthbw39rod5eght70wqvbbkislurptam9imo41jpfqmjn0eujg20fayb8r783teeepvrnko848bmbf1gdkz9eogohqsp84owpy8t3x"],
        ["aces5", "TOk03wZOjy2ZNvSkGKzX6YUcvK5udxILmKF03K5ImehmGB8Jqibwp5awcHuaDx0mtoCY83e3KcWifeDddsEyugcHM1o9j0blDVxMOeOwVNymlEeHWtgfcgT1XS91iLg6PKqCuuAAZvS3k2mjl0npOIE3hQNJp5I7HSBrgC12y298RHmGW3infRDlMqLIzBMFi3jrJN6A8oqeBEgdnwepovYpTqkk7k5e6iJA2n181zUFnQeLpwvKm8dnFsxRUCy7j38QwVLPDYvOm4fMMFxo2eFHWer67HQ9fqhu8KqISyIGzotVn9Zh8s9BNrnVUpUk"],
        ["aces-eight", "5um608eo6ejt9wuiqqf7miikuqxexgtzeu5kbvv2jz8cnmtmnhpkxowzqcje1r2f"],
        ["aces-g9", "tSOOeUSId0ZSRVaW0Y8mbG9FZ4u6MARPtCnCeDYcq3VRiR9XJzO6qrf9T9T3jTyL22gghmBufr7JtJ6ngU9UHiHMEyzxsHRBahnTnpgX78bHQee2MSfotH34xkAVrOKIj5LUYXnOBAQUVvx1pVVaf9"],
        ["aces-g7", "Ey1SNTG2bQxrfTV6bkgk2Gj6SXIxq3Q20IS10hdEelYU1Od2XuiXkWokWmZ2L609bhJKzLkHFisgT9kYSo3ZeaSIEzxbtzJzc4ymrECTmfUPTFRWZ9KJyMrrm6dQUDRGl3Xd6Qkt8qRJXclwV4xzrnAtzFyHNOa5Ld5RqmpW6qTAf3EnwWJQeI3gfpDyUkmKxMzrAS8jXudm0dS0uej7FkgNEGPMpY5NU7wMQftoB15pAXBc9Xl0kseNEWRcTAjLaZ56R7CwHYpGn2W1Gm3So2rNWQ1Xe8YXPzmGSIZqUu4f2E7gh0TXCfF9HlcNOYLm"],
        ["cs3099group3", "wxhsoESvXI18ezjSGTYV2V3yqKNgJWqFNvTj2G7GOgmBpx1BCwFrEu3UAQq5n6cMXuJW73Gg1aagbHmcqsby9unlhDaN1aBgtba3"],
        ["g6", "0001001000010111110100000110001111010110100010110111000000100100110101111101110001111110101101100001010110001000101100010110111001111110110011010000111101101001011011010101110101001000110011000010010100000111010111000110001110100110010100001100011110111110"],
    ]);


    if (clientToSecretCode.get(client_id) !== client_secret)
        res.status(404).json();
    else {
        const passphrase = "1LIONAUTH2";
        const access_token = CryptoJS.AES.encrypt(JSON.stringify({
            username:
            JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(access_code), "12TIG5ER34").toString(CryptoJS.enc.Utf8)).username
            , client_id: client_id
        }), passphrase).toString();
        res.send({access_token: access_token});
    }
});

module.exports = router;
