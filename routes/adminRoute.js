const express = require('express')
const getAllUsers = require('../controller/admin/getAllUsers')
const authorizeRoles = require('../middleware/auth')
const router = express.Router()


router.get('/admin/getalluser', authorizeRoles.authorizeAdmin, getAllUsers)

module.exports = router
