const mongoose = require("mongoose")
const { Schema } = mongoose

const brokenLinksSchema = new mongoose.Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'albums',
    autopopulate: { maxDepth: 2 },
  },
  link: String,
  userAdded: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: { maxDepth: 1 },
  },
}, {
  versionKey: false,
  timestamps: true,
})

brokenLinksSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
brokenLinksSchema.plugin(require('mongoose-autopopulate'))
const Ratings = mongoose.model('brokenLinks', brokenLinksSchema, 'brokenLinks')

module.exports = Ratings
