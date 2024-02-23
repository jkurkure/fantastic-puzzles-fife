// sudoku level schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

const WordSearchLevelSchema = new Schema({
    seed: {type: String, required: true, minLength: 1, maxLength: 50},
    score : {type: Number, required: true, min: 0, max: 169},
    user: {type: String, required: true, minLength: 1, maxLength: 50},
    date: {type: Date, required: true, default: Date.now}
});

// function for creating a virtual url for the level
WordSearchLevelSchema.virtual("url").get(function () {
    return `/wordsearch?seed=${this.seed}`;
});

module.exports = mongoConnection.model("WordSearchLevel", WordSearchLevelSchema);