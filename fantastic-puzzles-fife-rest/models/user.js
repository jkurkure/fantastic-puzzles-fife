// user schema definition file
const mongoConnection = require("../mongoConnection");

const Schema = mongoConnection.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, minLength: 6, maxLength: 100},
    firstName: {type: String, required: true, minLength: 1, maxLength: 100},
    lastName: {type: String, required: true, minLength: 1, maxLength: 100},
    email: {type: String, required: true, minLength: 3, maxLength: 100},
    password: {type: String, required: true, minLength: 8, maxLength: 100},
});

module.exports = mongoConnection.model("User", UserSchema);