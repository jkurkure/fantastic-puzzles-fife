const express = require('express');
const router = express.Router();
const SudokuSolver = require('../sudokuSolver/SudokuSolver');
const SudokuLevel = require("../models/sudokuGame");

// route for creating a sudoku puzzle. It saves the board in the database if it is correct.
router.post('/', function (req, res, next) {
    const solver = new SudokuSolver(req.body.size, req.body.board);
    // use the solver to solve the given puzzle

    const solution = solver.getSolution();
    SudokuLevel.findOne({levelName: req.body.levelName}, (error, level) => {
        if (error) {
            throw error;
        }
        if (!level) {
            if (solver.isValidBoard() === false) {
                res.send("The board created is invalid. Check that you have at least 17 correct clues");
            } else {
                if (solver.getNumberOfSolutions() === 0) {
                    res.send("The board you created has no solution. Try Again");
                } else if (solver.getNumberOfSolutions() === 2) {
                    res.send("The board you created has multiple solutions. Try Again");
                } else {
                    // the board is valid so we save it in the database with the computed solution
                    const sudokuGame = new SudokuLevel({
                        levelName: req.body.levelName,
                        difficulty: solver.getDifficulty(),
                        size: req.body.size,
                        board: req.body.board,
                        solution: solution
                    });
                    sudokuGame.save();

                    res.send("VALID BOARD");
                }
            }
        } else {
            res.send("Level name is unavailable please change it.");
        }

    });

});

module.exports = router;
