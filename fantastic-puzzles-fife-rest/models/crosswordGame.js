// crossword level schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

/**
 * The definition of a Crossword level schema for a JSON file.
 * This is to be sent to the database.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {difficulty: {minLength: number, type:
 * StringConstructor, required: boolean, maxLength: number}, grid: {type: Mixed, required: boolean}, words: {type: StringConstructor[],
 * required: boolean}, levelName: {minLength: number, type: StringConstructor, required: boolean, maxLength: number}, clues: {type:
 * StringConstructor[], required: boolean}}>}
 */
const CrosswordLevelSchema = new Schema({
    levelName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    difficulty: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20
    },
    words: {
        type: [String],
        required: true
    },
    clues: {
        type: [String],
        required: true
    },
    grid: {
        type: Schema.Types.Mixed,
        required: false
    }
});

// function for creating a virtual url for the level
CrosswordLevelSchema.virtual("url").get(function () {
    return `/level/${this._id}`;
});

module.exports = mongoConnection.model("CrosswordLevel", CrosswordLevelSchema);
