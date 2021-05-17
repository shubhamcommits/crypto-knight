const express = require('express')
const router = express.Router()

const { FavcoinControllers } = require('../controllers')

router.post('/', FavcoinControllers.createFavcoin)
router.get('/:userId', FavcoinControllers.getFavcoin)

module.exports = router