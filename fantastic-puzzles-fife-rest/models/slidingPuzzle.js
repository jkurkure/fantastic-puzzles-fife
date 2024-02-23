// crossword level schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

const SlidingPuzzleSchema = new Schema({
    levelName: {type: String, required: true, minLength: 1, maxLength: 50},
    difficulty: {type: String, minLength: 1, maxLength: 20},
    size: {type: Number, required: true},
    board: {type: [[]], required: true},
    solution: {type: [[]], required: true}
});


// function for creating a virtual url for the level
SlidingPuzzleSchema.virtual("url").get(function () {
    return `/level/${this._id}`;
});

module.exports = mongoConnection.model("PuzzleLevel", SlidingPuzzleSchema);