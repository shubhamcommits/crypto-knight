const dotenv = require('dotenv')

// Load the config from the .env file
dotenv.config()

// Set the keys value
const keys = {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_KEY: process.env.JWT_KEY
}

// Export the keys
module.exports = keys;