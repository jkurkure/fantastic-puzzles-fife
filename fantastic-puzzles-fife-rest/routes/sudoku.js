const express = require('express');
const router = express.Router();
const SudokuLevel = require("../models/sudokuGame");

// route for retrieving a sudoku board from the database using the level name as an identifier
router.get('/', function (req, res, next) {

    // Getting the levelname from the url.
    const levelName = req.query.puzzle;

    // Read the puzzle board from the database based on the puzzle id.
    SudokuLevel.findOne({'levelName': levelName}, 'board', function (err, board) {
        if (err) {
            return console.log("An error occurred while searching for the level name in the database");
        }
        // Getting the board and displaying it to the user
        if (board) {
            const myboard = board.board;
            res.json({board: myboard});
        } else {
            res.status(404).send();
        }
    });
});

// route for checking whether a given solution to a puzzle is valid.
router.post('/check-solution', function (req, res, next) {
    const levelName = req.query.level;
    // Read the level board from the database based on the level name.
    SudokuLevel.findOne({'levelName': levelName}, function (err, board) {
        if (err) {
            return console.log("An error occurred while searching for the level name in the database");
        }
        // Getting the board and displaying it to the user
        if (board) {
            if (JSON.stringify(req.body.solution) === JSON.stringify(board.solution))
                res.send({message: "SOLUTION IS CORRECT"});
            else
                res.send({message: "SOLUTION IS WRONG"});
        } else {
            res.status(404).send();
        }
    });
});

module.exports = router;
