const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const compression = require('compression')
const { AuthRoutes, UserRoutes, TriggerRoutes, FavcoinRoutes, PortfolioRoutes, NewsRoutes, TransactionRoutes } = require('./routes')

// Define the express application
const app = express()

// Open Mongoose connection to db
require('../db')

// Cors middleware for origin and Headers
app.use(cors())

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

// Correct REST naming
app.use('/api/auths', AuthRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/triggers', TriggerRoutes)
app.use('/api/favcoin', FavcoinRoutes)
app.use('/api/portfolio', PortfolioRoutes)
app.use('/api/news', NewsRoutes)
app.use('/api/transaction', TransactionRoutes)

// Invalid routes handling middleware
app.use((req, res, next) => {
    const error = new Error('404 not found')
    next(error)
})

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// Compressing the application
app.use(compression())

// Export the application
module.exports = app