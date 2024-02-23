const express = require('express');
const router = express.Router();
const CrosswordSolver = require('../crosswordSolver/CrosswordSolver');
const CrosswordLevel = require('../models/crosswordGame');

// route for creating a crossword puzzle. It saves the puzzle in the database if it is correct.
router.post('/', function (req, res, next) {
    const solver = new CrosswordSolver(req.body.words, req.body.clues);

    CrosswordLevel.findOne({ levelName: req.body.levelName }, (error, level) => {
        if (error) {
            throw error;
        }
        if (!level) {
            if (solver.checkCrosswordValidity(req.body.words, req.body.clues) !== "VALID") {
                res.send('The crossword is not valid please try again.');
            } else {
                console.log(req.body)
                let grid = solver.getLayout()
                let difficulty = solver.calculateDifficulty(req.body.words)
                const crosswordGame = new CrosswordLevel({
                    levelName: req.body.levelName,
                    difficulty: difficulty,
                    words: req.body.words,
                    clues: req.body.clues,
                    grid: grid
                });
                crosswordGame.save();
                res.send('VALID CROSSWORD');
            }
        } else {
            res.send('Level name is unavailable. Please choose a different name.');
        }
    });
});

module.exports = router;
