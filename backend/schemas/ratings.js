const mongoose = require("mongoose")
const { Schema } = mongoose

const ratingsSchema = new mongoose.Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'albums',
    autopopulate: { maxDepth: 1 },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: { maxDepth: 1 },
  },
  rating: Number,
}, {
  versionKey: false,
  timestamps: true,
})

ratingsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
const Ratings = mongoose.model('ratings', ratingsSchema, 'ratings')

module.exports = Ratings
