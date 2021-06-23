const express = require('express')
const router = express.Router()

const { AuthControllers } = require('../controllers')

router.post('/sign-in', AuthControllers.signIn)
router.post('/sign-up', AuthControllers.signUp)
router.post('/send-message', AuthControllers.sendMessage)
router.post('/forgot-password', AuthControllers.forgotPassword)

module.exports = router