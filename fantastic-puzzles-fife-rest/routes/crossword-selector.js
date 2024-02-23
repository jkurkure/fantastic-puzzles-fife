const express = require('express');
const router = express.Router();
const CrosswordLevel = require("../models/crosswordGame");

// route for retrieving all the crossword puzzle names and difficulties from the database.
router.get('/', function (req, res, next) {

    CrosswordLevel.find({}, 'levelName', function (err, levels) {
        if (err) {
            return console.log(err);
        }
        const names = [];
        for (const level of levels) {
            names.push(level.levelName);
        }

        CrosswordLevel.find({}, 'difficulty', function (err, diffs) {
            if (err) {
                return console.log(err);
            }
            const difficulties = [];
            for (const diff of diffs) {
                difficulties.push(diff.difficulty);
            }
            let mymenu = {"levels": names, "diffs": difficulties};
            res.json({menu: mymenu});
        });

    });


});

function addLevel(level) {
    levels.push(level)
}

module.exports = router;
