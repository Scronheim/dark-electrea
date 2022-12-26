const mongoose = require("mongoose")
const { Schema } = mongoose

const albumsSchema = new mongoose.Schema({
  title: String,
  band: {
    type: Schema.Types.ObjectId,
    ref: 'bands',
    autopopulate: true,
  },
  cover: String,
  type: String,
  tracks: String,
  releaseDate: Date,
  format: String,
  label: {
    type: Schema.Types.ObjectId,
    ref: 'labels',
    autopopulate: true,
  },
  catalogId: String,
  limitations: Number,
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: true,
    }
  ],
  description: String,
  links: Object,
  userAdded: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
}, {
  versionKey: false,
  timestamps: true,
})

albumsSchema.plugin(require('mongoose-autopopulate'))
const Artists = mongoose.model('albums', albumsSchema, 'albums')

module.exports = Artists
