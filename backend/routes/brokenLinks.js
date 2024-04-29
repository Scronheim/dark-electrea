const express = require('express')
const router = new express.Router()

const db = require('../queries/brokenLinks')

router.route('/api/broken_links')
  .get(db.getBrokenLinks)
  .post(db.addBrokenLinks)
  .delete(db.deleteBrokenLink)

module.exports = router
