const express = require('express');
const router = express.Router();
const Comments = require("../models/comments");

// route for retrieving all the comments.
router.get('/', function (req, res, next) {

    // from the request, retrieves the puzzle information needed.
    const puzzleType = req.query.puzzleType;
    const puzzleName = req.query.puzzleName;

    /**
     * Based on the puzzle type and its name, finds all the commenters.
     */
    Comments.find({'puzzleType': puzzleType, 'puzzleName':puzzleName}, 'commenter', function (err, commenters) {
        if (err) {
            return console.log(err);
        }
        // Constructs an array of the comments.
        const commenterArray = [];
        for (const commenter of commenters) {
            commenterArray.push(commenter.commenter);
        }

        /**
         * Based on the puzzle type and name, finds all the IDs.
         */
        Comments.find({'puzzleType': puzzleType, 'puzzleName':puzzleName}, 'id', function(err, IDs) {
            if (err) {
                return console.log(err);
            }

            // constructs an array of all the IDs. 
            const IDArray = [];
            for (const ID of IDs) {
                IDArray.push(ID.id);
            }

            /**
             * Based on the puzzle type and name, finds all the comments.
             */
            Comments.find({'puzzleType': puzzleType, 'puzzleName':puzzleName}, 'comment', function(err, comments) {
                if (err) {
                    return console.log(err);
                }
                
                // Constructs an array of all the comments.
                const commentArray = [];
                for (const comment of comments) {
                    commentArray.push(comment.comment);
                }

                // Constructs the object containing the constructed arrays.
                let mysection = {"commenters": commenterArray, "ids": IDArray, "commentList": commentArray};
                res.json({section: mysection});
            });
        });
    });


});

module.exports = router;