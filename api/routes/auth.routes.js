const express = require('express')
const router = express.Router()

const { AuthControllers } = require('../controllers')

router.post('/sign-in', AuthControllers.signIn)
router.post('/sign-up', AuthControllers.signUp)

module.exports = router