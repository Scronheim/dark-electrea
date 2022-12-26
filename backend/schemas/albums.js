const mongoose = require("mongoose")
const { Schema } = mongoose

const albumsSchema = new mongoose.Schema({
  title: String,
  band: {
    type: Schema.Types.ObjectId,
    ref: 'bands',
    autopopulate: {maxDepth: 1},
  },
  cover: String,
  type: String,
  tracks: Array,
  releaseDate: Date,
  format: String,
  label: {
    type: Schema.Types.ObjectId,
    ref: 'labels',
    autopopulate: true,
    default: '63a9aa0a8562ab12bcddd78b',
  },
  catalogId: String,
  limitations: Number,
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: {maxDepth: 1},
    }
  ],
  description: String,
  links: {
    type: Object,
    default: {
      bandcamp: '',
      discogs: '',
      yaMusic: '',
      spotify: '',
      download: [],
    }
  },
  userAdded: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
}, {
  versionKey: false,
  timestamps: true,
})

albumsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
albumsSchema.plugin(require('mongoose-autopopulate'))
const Artists = mongoose.model('albums', albumsSchema, 'albums')

module.exports = Artists
