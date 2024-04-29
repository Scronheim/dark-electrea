const express = require('express')
const router = new express.Router()

const db = require('../queries/users')

router.route('/api/me')
  .get(db.aboutMe)
  .patch(db.updateMe)
router.post('/api/login', db.login)
router.post('/api/register', db.register)
router.patch('/api/change_password', db.changePassword)

module.exports = router
