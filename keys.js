const dotenv = require('dotenv')
const path = require('path')

// Load the config from the .env file
dotenv.config()

// Set the keys value
const keys = {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_KEY: process.env.JWT_KEY,
    REALTIME_COIN_PRICES: process.env.REALTIME_COIN_PRICES,
    COIN_DETAILS: process.env.COIN_DETAILS,
    FILE_UPLOADS_FOLDER: path.join(__dirname, './uploads/')
}

// Export the keys
module.exports = keys