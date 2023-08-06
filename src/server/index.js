// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware */
// Use express.json to parse incoming JSON requests
app.use(express.json());

// Use express.urlencoded to parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
const port = process.env.PORT || 8081;
app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Server is running on localhost:${port}`);
}

// API Key
const url = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;

// Route to serve the main HTML file
app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
});

// POST Route to handle the sentiment analysis API request
app.post("/api", async function (req, res) {
    // Extract the URL from the request body
    const projectData = req.body.url;
    console.log(`Your Data: ${projectData}`);

    // Create the API URL with the API Key and the provided URL
    const apiURL = `${url}key=${apiKey}&url=${projectData}&lang=en`;

    // Fetch the sentiment analysis data from the API
    const response = await fetch(apiURL);
    try {
        const sData = await response.json();
        // Send the sentiment analysis data as the response
        res.send(sData);
    } catch (error) {
        console.log("error", error);
        // Handle any errors that occur during the API request
        res.status(500).send({ error: "An error occurred while processing the request." });
    }
});
