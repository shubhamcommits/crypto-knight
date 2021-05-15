const mongoose = require('mongoose')
const keys = require('./keys')

// Get Mongoose to use global promise library to avoid error messages
mongoose.Promise = global.Promise

// Set up mongoose connection
const  dbURL  = keys.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/crypto-knight'

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

// Connect mongoose to db
mongoose.connect(dbURL, options)

// Log Mongoose connection status changes:
mongoose.connection.on('connected', () => {
  console.log(`🗄  Mongoose connection is open!`)
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection had an error:\n${err}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected due to app termination processs.')
    process.exit(0)
  })
})
