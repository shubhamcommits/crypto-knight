const express = require('express')
const router = express.Router()

const { TriggerControllers } = require('../controllers')

router.post('/', TriggerControllers.createTrigger)

module.exports = router