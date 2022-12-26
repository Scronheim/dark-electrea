const express = require('express')
const router = new express.Router()

const db = require('../queries/search')

router.route('/api/search')
  .get(db.searchBand)
  .post(db.searchBandsWithFilters)

module.exports = router
