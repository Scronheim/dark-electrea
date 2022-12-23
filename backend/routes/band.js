const express = require('express')
const router = new express.Router()

const db = require('../queries/band')

router.route('/api/bands')
  .get(db.getBands)
  .post(db.addBand)
  .patch(db.updateBand)

module.exports = router
