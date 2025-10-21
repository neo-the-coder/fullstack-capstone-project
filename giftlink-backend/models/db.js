// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    // Task 1: Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to server");

    // Task 2: Connect to database giftDB and store in variable dbInstance
        
dbNamedbNamedbInstance        // Task 3: Return database instance
    tch (err) {
    consoledbInstance;ror(err);
module.exports = connectToDatabase;
