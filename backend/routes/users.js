const express = require('express')
const router = new express.Router()

const db = require('../queries/users')

router.get('/api/me', db.aboutMe)
router.post('/api/login', db.login)
router.post('/api/register', db.register)
router.patch('/api/change_password', db.changePassword)

module.exports = router
