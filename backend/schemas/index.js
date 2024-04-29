const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.set('strictQuery', true)

const db = {}

db.mongoose = mongoose
db.bands = require('./band')
db.people = require('./people')
db.albums = require('./albums')
db.users = require('./users')
db.labels = require('./label')
db.ratings = require('./ratings')
db.brokenLinks = require('./brokenLinks')

module.exports = db
