const express = require('express')
const router = new express.Router()

const db = require('../queries/artist')

router.route('/api/artists')
  .get(db.getArtists)
  .post(db.addArtist)
  .patch(db.updateArtist)

module.exports = router
