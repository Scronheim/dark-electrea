const express = require('express')
const router = new express.Router()

const db = require('../queries/albums')

router.route('/api/albums')
  .get(db.getAlbum)
  .post(db.addAlbum)
  .patch(db.updateAlbum)

module.exports = router
