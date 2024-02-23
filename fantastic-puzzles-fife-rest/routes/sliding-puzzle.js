const express = require('express');
const router = express.Router();
const slidingPuzzle = require("../models/slidingPuzzle");

router.get('/', function (req, res, next) {

    // Getting the levelname from the url.
    const levelName = req.query.puzzle;

    // Read the puzzle board from the database based on the level name.
    slidingPuzzle.findOne({'levelName': levelName}, 'board', function (err, board) {
        if (err) {
            return console.log("An error occurred while searching for the level name in the database");
        }
        // Getting the board and sending it to the front end.
        if (board) {
            const myboard = board.board;
            res.json({board: myboard});
        } else {
            res.status(404).send();
        }
    });
});


module.exports = router;
