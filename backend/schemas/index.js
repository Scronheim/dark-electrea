const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.artists = require('./artist')
db.people = require('./people')

module.exports = db
