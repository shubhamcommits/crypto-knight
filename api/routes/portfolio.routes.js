const express = require('express')
const router = express.Router()

const { PortfolioControllers } = require('../controllers')

router.post('/', PortfolioControllers.createPortfolio)
router.get('/:userId', PortfolioControllers.getPortfolio)
router.get('/value/:userId', PortfolioControllers.getPortfolioValue)
router.get('/detail/:coinId', PortfolioControllers.getPortfolioDetail)

module.exports = router