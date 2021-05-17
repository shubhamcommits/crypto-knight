const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const FavcoinSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coinid: {
    type: String,
    default: null
  }
})

const Favcoin = mongoose.model('Favcoin', FavcoinSchema)

module.exports = Favcoin