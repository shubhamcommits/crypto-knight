const express = require('express')
const router = express.Router()

const { TriggerControllers } = require('../controllers')

router.post('/', TriggerControllers.createTrigger)
router.get('/:userId', TriggerControllers.getTrigger)

module.exports = router