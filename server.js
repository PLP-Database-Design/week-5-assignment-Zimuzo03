// Import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv');

// Configure environment variable
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the connection
db.connect((err) => {
    // If no connection
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    // If connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
});


// Retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        //if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    });
});


// Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT * FROM providers"
    db.query(getProviders, (err, data) => {
        //if I have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }
        res.status(200).send(data)
    });
});


// Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        //if I have an error
        if(err) {
            return res.status(400).send("Failed to get first_name", err)
        }
        res.status(200).send(data)
    });
});


// Filter Retrieve all providers by their specialty
app.get('/providers/:specialty', (req, res) => {
    const getPatients = "SELECT provider_specialty FROM providers"
    db.query(getPatients, (err, data) => {
        //if I have an error
        if(err) {
            return res.status(400).send("Failed to get provider_specialty", err)
        }
        res.status(200).send(data)
    });
});




// Start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
});