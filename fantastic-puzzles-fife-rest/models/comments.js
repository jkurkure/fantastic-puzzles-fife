// comments schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

const CommentsSchema = new Schema({
    id: {type: String, required: true, minLength: 1, maxLength: 10},
    puzzleType: {type: String, required: true, minLength: 1, maxLength: 50},
    puzzleName: {type: String, required: true, minLength: 1, maxLength: 50},
    commenter: {type: String, required: true, minLength: 3, maxLength: 200},
    comment: {type: String, required: true, minLength: 1, maxLength: 100},
    replies: {type: [], required: true},
});

module.exports = mongoConnection.model("Comments", CommentsSchema);