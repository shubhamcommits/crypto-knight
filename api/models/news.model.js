const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const NewsSchema = new Schema({
  title: {
    type: String,
    default: null
  },
  desc: {
    type: String,
    default: null
  },
  category: {
    type: String,
    default: null
  },
  coinid: {
    type: String,
    default: null
  }
})

const News = mongoose.model('News', NewsSchema)

module.exports = News