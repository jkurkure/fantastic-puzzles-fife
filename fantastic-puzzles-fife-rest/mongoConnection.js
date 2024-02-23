/**
 * This file establishes the connection to the mongoDB database using mongoose.
 * This is used to perform CRUD operations on the database for the use of the website.
 */
const mongoose = require("mongoose");

const mongoDB = "mongodb://admin:Moh4yie9@0.0.0.0:24086"
// const mongoDB = "mongodb+srv://djn9:denisiscool1912@cluster0.mdlfvbz.mongodb.net/?retryWrites=true&w=majority";
const mongoConnection = new mongoose.Mongoose();
mongoConnection.connect(mongoDB);
mongoConnection.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = mongoConnection;