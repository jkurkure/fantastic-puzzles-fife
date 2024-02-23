// sudoku level schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

/**
 * Definition of a Sudoku level to be sent to the database.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {},
 * DefaultTypeKey, {difficulty: {minLength: number, type: StringConstructor, maxLength:
 * number}, size: {type: NumberConstructor, required: boolean}, solution: {type: *[][],
 * required: boolean}, levelName: {minLength: number, type: StringConstructor, required:
 * boolean, maxLength: number}, board: {type: *[][], required: boolean}}>}
 */
const SudokuLevelSchema = new Schema({
    levelName: {type: String, required: true, minLength: 1, maxLength: 50},
    difficulty: {type: String, minLength: 1, maxLength: 20},
    size: {type: Number, required: true},
    board: {type: [[]], required: true},
    solution: {type: [[]], required: true}
});

// function for creating a virtual url for the level
SudokuLevelSchema.virtual("url").get(function () {
    return `/level/${this._id}`;
});

module.exports = mongoConnection.model("SudokuLevel", SudokuLevelSchema);
