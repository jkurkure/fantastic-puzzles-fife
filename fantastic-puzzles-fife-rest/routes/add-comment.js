const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const PuzzleComments = require('../models/comments');


router.post('/', function (req, res, next) {
    /**
     * Makes a get request to the Puzzle Comments table for the IDs of the comments.
     */
    PuzzleComments.find({}, 'id', function (error, comments) {
        if (error) {
            throw error;
        }
        let newID = 0;
        // Loops through the IDs to get the next one.
        for (const comment of comments) {
            newID++;
        }

        /**
         * searches the data base for the new puzzle comment.
         */
        PuzzleComments.findOne({ id: newID }, (error, commentData) => {
            if (error) {
                throw error;
            }

            // Checks the comment ID does not exist.
            if (!commentData) {
                // validation check for if the comment is empty.
                if (req.body.comment != "") {

                    // finds replies.
                    if (req.body.comment[0] == "@") {
                        let replyID = req.body.comment.split(" ")[0].replace("@", "");
                        /**
                         * Finds the comment that is being replied to.
                         */
                        PuzzleComments.findOne({id: replyID}, 'replies', (error, repliesArray) => {
                            if (error) {
                                throw error;
                            }
                            // Adds the new comment ID to the array of replies.
                            let newReplies = repliesArray.replies;
                            newReplies.push(newID);
                            console.log(replyID);

                            /**
                             * Updates the database with the new replies array.
                             */
                            PuzzleComments.updateOne({id: replyID}, {replies: newReplies}, (error, res) => {
                                if (error) {
                                    throw error;
                                }
                            });
                        });
                    }

                    // The new entry is created.
                    const commentMade = new PuzzleComments({
                        id: newID,
                        puzzleType: req.body.puzzleType,
                        puzzleName: req.body.puzzleName,
                        commenter: req.body.commenter,
                        comment: req.body.comment
                    });
                    // The new entry is saved.
                    commentMade.save();

                    res.send("COMMENT ADDED");
                }
                else {
                    res.send("INVALID COMMENT");
                }

            }
        });

    });
});

module.exports = router;