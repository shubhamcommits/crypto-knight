const express = require('express')
const router = express.Router()

const { UserControllers } = require('../controllers')

router.get('/:userId', UserControllers.getUser)
router.get('/users/all', UserControllers.getAllUser)
router.put('/:userId', UserControllers.updateUser)

module.exports = router