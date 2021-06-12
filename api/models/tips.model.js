const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

// Buy/Sell
// Name
// Target 
// Expected return
// Entry
// Stop loss
const TipsSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  target: {
    type: Number,
    default: null
  },
  expected_return: {
    type: Number,
    default: null
  },
  entry_1: {
    type: Number,
    default: null
  },
  entry_2: {
    type: Number,
    default: null
  },
  stop_loss: {
    type: Number,
    default: null
  },
})

const Tips = mongoose.model('Tips', TipsSchema)

module.exports = Tips