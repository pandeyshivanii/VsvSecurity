const express = require('express')
const signup = require('../controller/auth/Signup')
const login = require('../controller/auth/Login')
const { logoutUser } = require('../controller/auth/logout')

const router = express.Router()
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.post('/auth/logout', logoutUser)

module.exports = router