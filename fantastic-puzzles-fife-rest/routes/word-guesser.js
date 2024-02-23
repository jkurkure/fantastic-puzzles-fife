//Backend retrieval of words for wordguesser

const express = require('express');
const router = express.Router();
const axios = require('axios');


//This function returns a list of all word objects with a length of 5 along with an id to identify the word
function setWords(text) {
    words = text.split("\n");
    words = words.filter((data) => {
        return data.length === 5;
    })
}

// NOTE - number of words should be 1379 :)
let words = [];

//Whilst this backend route is running this a list of 5 letter words are obtained from the MIT website
const url = "https://www.mit.edu/~ecprice/wordlist.10000"
axios.get(url)
    .then( (res) => {
        setWords(res.data);
    })
    .catch((err) => {
        console.error("Error fetching word list for word search:", err);
    });

//This get request randomly returns a possible solution from our list of possible solutions
router.get('/randomSol', function (req, res, next) {
    let wordIndex = Math.floor(Math.random()*words.length)
    let newSolution = words[wordIndex]
    res.json({solution : newSolution, id : (wordIndex)});
});

//This request randomly generates an word to be used
router.get('/generateID', function (req, res, next) {
    let wordIndex = Math.floor(Math.random()*words.length)
    res.json({id : (wordIndex)});
});

//This get request returns a specific solution determined from the puzzle id
router.get('/getSol', function (req, res, next) {
    const wordIndex = req.query.id
    let newSolution = words[wordIndex]
    res.json({solution : newSolution, id : (wordIndex)});
});
module.exports = router;
