const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: 'default_user.png'
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    mobile_number: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: moment().format()
    },
    trading_experience: {
        type: Number,
        default: 0,
        required: true
    },
    triggers: [{
        type: Schema.Types.ObjectId,
        ref: 'Trigger'
    }],
    favcoin: [{
        type: Schema.Types.ObjectId,
        ref: 'Favcoin'
    }],
    portfolio: [{
        type: Schema.Types.ObjectId,
        ref: 'Portfolio'
    }],
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    reset_password_token: {
        type: String,
      },
    reset_password_expires: {
        type: Date,
        default: null,
    },
})

const User = mongoose.model('User', UserSchema)

module.exports = User