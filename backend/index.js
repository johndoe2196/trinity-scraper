// Configure environment variables from .env file ahead of any function
// requiring an env var
require("dotenv").config({ path: "./config/.env" })

// General imports
const express = require("express")
const bodyParser = require("body-parser")
const http = require("http")

// Custom imports
const register = require("./src/register")

// Assign required environment variables
const SERVER_PASSPHRASE = process.env.SERVER_PASSPHRASE

// Initiating server - default express configuration
const PORT = process.env.PORT || 5000
const app = express()
// Middleware to fetch body
app.use(bodyParser.urlencoded({
    extended: true
}))
const server = http.createServer(app)

// Singular endpoint for registering users in the morning...
app.post("/register", async (req, res) => {
    // Default the user to being unauthorized - only requests with the correct
    // server password in the body will continue (server password has no auth
    // purposes beyond enabling this endpoint, and is obviously only a basic
    // precaution to prevent abuse of this endpoint)
    res.status(401)
    if(req.body.serverPassphrase === SERVER_PASSPHRASE) {
        try {
            // Attempt to register user
            await register(req.body.encryptedAuthString)
            // Set status code to success upon completion of registration
            res.status(200)
        } catch(err) {
            // Otherwise, set status code to server error, and log whatever
            // error was thrown - no further action required as this endpoint
            // will never be called by a person, and no further details are of
            // use
            res.status(500)
            console.log(err)
        }
    } else {
        // Log attempt to access server without correct passphrase
        console.log("UNAUTHORIZED ACCESS ATTEMPT MADE!")
    }
    // Send response with status code only - no message required as user will
    // receive an email on success, and the server will log any errors for further
    // action
    res.send()
})

// Run server, and console log port once running
server.listen({ port: PORT }, () => {
    console.log(`Server listening on port ${PORT}`)
})

