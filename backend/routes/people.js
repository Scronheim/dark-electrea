const express = require('express')
const router = new express.Router()

const db = require('../queries/people')

router.route('/api/people')
    .get(db.searchPerson)
    .post(db.addPerson)
    .patch(db.updatePerson)

module.exports = router
