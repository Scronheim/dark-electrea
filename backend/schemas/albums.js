const mongoose = require("mongoose")
const { Schema } = mongoose

const albumsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  band: {
    type: Schema.Types.ObjectId,
    ref: 'bands',
    autopopulate: { maxDepth: 1 },
  },
  cover: String,
  type: String,
  genre: String,
  tracks: Array,
  releaseDate: String,
  format: String,
  label: String,
  catalogId: String,
  limitations: Number,
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: { maxDepth: 1 },
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
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ratings',
      autopopulate: { maxDepth: 1 },
    }
  ]
}, {
  versionKey: false,
  timestamps: true,
})

albumsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
albumsSchema.plugin(require('mongoose-autopopulate'))
const Artists = mongoose.model('albums', albumsSchema, 'albums')

module.exports = Artists
