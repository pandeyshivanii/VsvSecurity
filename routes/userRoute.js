const express = require('express')
const userProfile = require('../controller/profile/userProfile')
const router = express.Router()


router.get('/user/profile', userProfile)

module.exports = router