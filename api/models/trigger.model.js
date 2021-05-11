const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const TriggerSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coin: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
  condition: {
    type: String,
    default: 'less',
    enum: ['less', 'greater', 'equal']
  },
  created_date: {
    type: Date,
    default: moment().format()
  }
})

const Trigger = mongoose.model('Trigger', TriggerSchema)

module.exports = Trigger