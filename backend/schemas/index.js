const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.bands = require('./band')
db.people = require('./people')
db.albums = require('./albums')
db.users = require('./users')

module.exports = db
