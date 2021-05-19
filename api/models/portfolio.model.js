const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const PortfolioSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coinid: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  totalinvestment: {
    type: Number,
    default: 0
  },
  avprice: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: null
  },
  transaction_date: {
    type: Date,
    default: moment().format()
  },
  created_date: {
    type: Date,
    default: moment().format()
  }
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema)

module.exports = Portfolio