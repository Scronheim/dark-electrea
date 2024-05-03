const express = require('express')
const router = new express.Router()

const db = require('../queries/stats')

router.route('/api/stats')
  .get(db.getStats)

module.exports = router
