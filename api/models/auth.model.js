const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const AuthSchema = new Schema({
  token: {
    type: String,
    default: null
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  last_login: {
    type: Date,
    default: moment().format()
  },
  created_date: {
    type: Date,
    default: moment().format()
  }
})

const Auth = mongoose.model('Auth', AuthSchema)

module.exports = Auth
