const express = require('express');
const router = express.Router();
const SudokuLevel = require("../models/sudokuGame");

// Function to map difficulty strings to integer values based on the specified criteria
function mapDifficultyToValue(difficulty) {
    switch(difficulty.toLowerCase()) {
        case 'easy':
            return 1;
        case 'medium':
            return 3;
        case 'hard':
            return 5;
        case 'very hard':
            return 7;
        case 'extreme':
            return 10;
        default:
            return 1; // Default to 'easy' if the difficulty string doesn't match any of the cases
    }
}

/**
 * Sends the formatted JSON file for a sudoku puzzle in the
 * Supergroup format to the front edn to be downloaded.
 */
router.post('/', function (req, res, next) {
    // Find the SudokuLevel document with the specified levelID
    SudokuLevel.findOne({ levelName: req.body.levelID })
        .exec((error, level) => {
            if (error) {
                // If there's an error, log it and return a 500 error to the client
                console.error(error);
                res.status(500).send('An error occurred while fetching the puzzle.');
                return;
            }
            console.log(req.body.levelID);

            if (!level) {
                // If there's no document with the specified levelID, return a 404 error to the client
                res.status(404).send('The specified levelID was not found.');
                return;
            }

            // Map the difficulty string to an integer value based on the specified criteria
            const difficultyValue = mapDifficultyToValue(level.difficulty);

            const author = {
                username: 'cs3099user01',
                origin: {
                    name: 'Fantastic Puzzles Fife 1',
                    url: 'https://cs3099user01.host.cs.st-andrews.ac.uk',
                    id: level._id,
                },
                display_name: 'cs3099user01',
            };

            // Construct the level object with the required format
            const levelObject = {
                _id: level._id,
                name: level.levelName,
                variant: 'sudoku',
                data: {
                    puzzle: level.board,
                    solution: level.solution,
                },
                author: author,
                difficulty: difficultyValue,
            };

            // Send the level object as the response body
            res.json(levelObject);
        });

});

module.exports = router;
