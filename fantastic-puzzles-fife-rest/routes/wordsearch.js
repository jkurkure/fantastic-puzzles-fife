// This is a Node.js application that generates a word search puzzle based on three random hex values and checks the user's solution against the generated puzzle. The solution is considered correct if all the words in the puzzle are found in the user's solution.


const express = require('express');
const router = express.Router();
const WordSearchLevel = require("../models/wordSearchGame");
const axios = require('axios');

 
/**
 * Takes in a string and splits it into an array of words.       
 * @param {string} readText - the text to split into words       
 * @returns {string[]} - an array of words       
 */
let words = [];

function setWords(readtext) {
    words = readtext.split("\n");
    //filter out words less than three characters
    words = words.filter((el) => {
        return el.length > 3;
    })
    //console.log(words.length);
}

/**
 * Checks if the given subsetArray is a subset of the given parentArray.           
 * @param {Array} parentArray - the array to check if subsetArray is a subset of.           
 * @param {Array} subsetArray - the array to check if it is a subset of parentArray.           
 * @returns {boolean} - true if subsetArray is a subset of parentArray, false otherwise.           
 */
let checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}

/**
 * Takes in a score and returns the sum of the scores.           
 * @param {number[]} score - the score array           
 * @returns {number} - the sum of the scores           
 */
let getSum = (score) => {
    let sum = 0;
    for (let i = 0; i < score.length; i += 1) {
        sum += score[i][1];
    }
    return sum;
}

/**
 * Fetches the word list from the given URL.       
 * @param {string} url - the URL to fetch the word list from.       
 * @returns None       
 */
const url = "https://www.mit.edu/~ecprice/wordlist.10000"
axios.get(url)
   .then( (res) => {
        setWords(res.data);
    })
   .catch((err) => {
        console.error("Error fetching word list for word search:", err);
    });


/**
 * A route that returns a puzzle          
 * @param {Request} req - the request object           
 * @param {Response} res - the response object containing the puzzle and seed   
 * @param {Function} next - the next function           
 * @returns None           
 */
router.get('/make-puzzle', function (req, res, next) {
    // Using a RGB color hex seed to generate the puzzle
    let hex1 = "#" + Math.floor(Math.random()*16777215).toString(16);
    let r1 = parseInt(hex1.slice(1,3), 16);
    let g1 = parseInt(hex1.slice(3,5), 16);
    let b1 = parseInt(hex1.slice(5,7), 16);
    let hex2 = "#" + Math.floor(Math.random()*16777215).toString(16);
    let r2 = parseInt(hex2.slice(1,3), 16);
    let g2 = parseInt(hex2.slice(3,5), 16);
    let b2 = parseInt(hex2.slice(5,7), 16);
    let hex3 = "#" + Math.floor(Math.random()*16777215).toString(16);
    let r3 = parseInt(hex3.slice(1,3), 16);
    let g3 = parseInt(hex3.slice(3,5), 16);
    let b3 = parseInt(hex3.slice(5,7), 16);
    
    let solution = (words[Math.min(8000, Math.floor((r1/2)*(r2/2)+r3/2))] + "" + words[Math.min(8500, Math.floor((g1/2)*(g2/2)+g3/2))] + words[Math.min(8900, Math.floor((b1/2)*(b2/2)+b3/2))]).split("");
    let jumble = Array.from(new Set(solution)).sort((a, b) => 0.5 - Math.random()).join("");

    res.json({seed: hex1 + " " + hex2 + " " + hex3, puzzle: jumble});
});

/**
 * A route that returns a puzzle for a specific seed.            
 * @param {Request} req - the request object containing the seed          
 * @param {Response} res - the response object containing the puzzle       
 * @param {Function} next - the next function           
 * @returns None           
 */
router.get('/cook', function (req, res, next) {
    const seedValue = req.query.seed;
    let hex = [""];
    hex = seedValue.split(",");
    let r1 = parseInt(hex[0].slice(0,2), 16);
    let g1 = parseInt(hex[0].slice(2,4), 16);
    let b1 = parseInt(hex[0].slice(4,6), 16);
    let r2 = parseInt(hex[1].slice(0,2), 16);
    let g2 = parseInt(hex[1].slice(2,4), 16);
    let b2 = parseInt(hex[1].slice(4,6), 16);
    let r3 = parseInt(hex[2].slice(0,2), 16);
    let g3 = parseInt(hex[2].slice(2,4), 16);
    let b3 = parseInt(hex[2].slice(4,6), 16);

    let solution = (words[Math.min(8000, Math.floor((r1/2)*(r2/2)+r3/2))] + "" + words[Math.min(8500, Math.floor((g1/2)*(g2/2)+g3/2))] + words[Math.min(8900, Math.floor((b1/2)*(b2/2)+b3/2))]).split("");
    // console.log(b1 + " " + b2 + " " + b3);
    let jumble = Array.from(new Set(solution)).sort((a, b) => 0.5 - Math.random()).join("");

    res.json({puzzle: jumble});
});

/**
 * Checks if the given word is a subset of the given array.       
 * @param {string[]} arr - the array to check against       
 * @param {string[]} word - the word to check       
 * @returns {boolean} - true if the word is a subset of the array, false otherwise       
 */
router.get('/check', function (req, res, next) {
    let score = [];
    guesses = req.query.guess.split(":");
    const seedValue = req.query.seed;
    // console.log(seedValue);
    let hex = [""];
    hex = seedValue.split(",");
    let r1 = parseInt(hex[0].slice(0,2), 16);
    let g1 = parseInt(hex[0].slice(2,4), 16);
    let b1 = parseInt(hex[0].slice(4,6), 16);
    let r2 = parseInt(hex[1].slice(0,2), 16);
    let g2 = parseInt(hex[1].slice(2,4), 16);
    let b2 = parseInt(hex[1].slice(4,6), 16);
    let r3 = parseInt(hex[2].slice(0,2), 16);
    let g3 = parseInt(hex[2].slice(2,4), 16);
    let b3 = parseInt(hex[2].slice(4,6), 16);

    for (let i = 0; i < guesses.length; i++) {
        guesses[i] = guesses[i].toLowerCase();
        let solutionSet = [words[Math.min(8000, Math.floor((r1/2)*(r2/2)+r3/2))], words[Math.min(8500, Math.floor((g1/2)*(g2/2)+g3/2))], words[Math.min(8900, Math.floor((b1/2)*(b2/2)+b3/2))]];
        if (solutionSet.includes(guesses[i])) {
            score.push([guesses[i], 5]);
        }
        else if (words.includes(guesses[i]) && checkSubset(solutionSet.join("").split(""), guesses[i].split(""))) {
            score.push([guesses[i], 1]);
        }
            console.log(solutionSet);
        }

        res.json({result: getSum(score)>0, points: getSum(score), board: score});
});

router.get('/highscore', function (req, res, next) {
    if (isNaN(req.query.score) || req.query.score < 1){
        console.log(req.query);
        res.json({valid: false});
    }
    else {
        const wordSearch = new WordSearchLevel({
            seed: req.query.seed,
            score : req.query.score,
            user: req.query.username,
            date: Date.now()
        });
        wordSearch.save();
    }
});

router.get('/levels', function (req, res, next) {
    WordSearchLevel.find({}).sort({score: -1}).limit(10).exec(function (err, docs) {
        res.json(docs);
    });
});

module.exports = router;
