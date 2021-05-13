const express = require('express')
const router = express.Router()

const { FavcoinControllers } = require('../controllers')

router.post('/', FavcoinControllers.createFavcoin)

module.exports = router