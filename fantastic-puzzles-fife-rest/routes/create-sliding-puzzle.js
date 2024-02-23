const express = require('express');
const router = express.Router();
const SlidingLevel = require("../models/slidingPuzzle");

router.post('/', function (req, res, next) {

    /**
     * Queiries the database to check the level is not already there.
     */
    SlidingLevel.findOne({levelName: req.body.levelName}, (error, level) => {
        // A check to make sure the level name has been entered.
        if (req.body.levelName === null) {
            res.send("Level name is required.");
        }
        if (error) {
            throw error;
        }

        // Checks the level does not already exist.
        if(!level) {
            let total = 0;
            let allIn = true;
            let testBoard = req.body.board.flat();

            // Checks that 0 is included. 
            if (!testBoard.includes(0)) {
                allIn = false;
            }

            // Loops over the numbers that should be in the puzzle.
            for (let i = 0; i < 8; i++) {
                // Checks the current number is in it.
                if (!testBoard.includes(i + 1)) {
                    allIn = false;
                }

                // The check for if the puzzle is solvable.

                // Loops over the whole board.
                for (let j = i + 1; j < 9; j++) {
                    // Check for if the current comparisson requires a swap.
                    if (testBoard[i] > 0 && testBoard[j] > 0 && testBoard[i] > testBoard[j]) {
                        // if so, the total is incramented.
                        total++;
                    }
                }
            }

            // Setting the difficulty based on the number of swaps required to solve the puzzle.
            let diff = "Easy";
            if (total % 2 == 0 && allIn) {
                if (total > 10 && total < 19) {
                    diff = "Medium"; 
                }
                else if (total >20 && total < 29) {
                    diff = "Hard";
                }
                else if (total > 30) {
                    diff = "Expert";
                }

                // Creates the object for the sliding puzzle.
                const slidingGame = new SlidingLevel({
                    levelName: req.body.levelName,
                    difficulty: diff,
                    size: req.body.size,
                    board: req.body.board
                });
                // Saves the new sliding puzzle.
                slidingGame.save();
                res.send("VALID BOARD");
            }
            else {
                res.send("Level is invalid.")
            }
        }
        else{
            res.send("Level name is unavailable please change it.");
        }


    });

});

module.exports = router;
