const express = require('express')
const router = express.Router()

const { TipsControllers } = require('../controllers')
// const { FileHandler } = require('../../utils')

router.post('/', TipsControllers.createTips)
router.get('/', TipsControllers.getTips)
router.get('/filter', TipsControllers.getFilteredTips)

module.exports = router