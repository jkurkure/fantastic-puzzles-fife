const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

//mongo db schema for 5 letter words
const WordSuggestionSchema = new Schema({
    suggester: {
        type: [String],
        required: true, 
        minLength: 5, 
        maxLength: 50
    },
    words: {
        type: [String],
        required: true, 
        minLength: 5, 
        maxLength: 50
    }
});

// function for creating a virtual url for this word
SudokuLevelSchema.virtual("url").get(function () {
    return `/word-guesser/${this._id}`;
});

module.exports = mongoConnection.model("WordSuggestion", WordSuggestionSchema);
