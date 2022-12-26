const express = require('express')
const router = new express.Router()

const db = require('../queries/labels')

router.route('/api/labels')
  .get(db.getLabels)
  .post(db.addLabel)
  .patch(db.updateLabel)

module.exports = router
