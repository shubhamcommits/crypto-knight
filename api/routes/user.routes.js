const express = require('express')
const router = express.Router()

const { UserControllers } = require('../controllers')

router.get('/:userId', UserControllers.getUser)
router.put('/:userId', UserControllers.updateUser)

module.exports = router