const mongoose = require("mongoose")
const { Schema } = mongoose

const bandsSchema = new mongoose.Schema({
  title: String,
  formedIn: Number,
  label: {
    type: Schema.Types.ObjectId,
    ref: 'labels',
    autopopulate: true,
  },
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: {maxDepth: 1},
    },
  ],
  exLineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: {maxDepth: 1},
    }
  ],
  country: String,
  city: String,
  status: {
    type: String,
    default: 'active',
  },
  genres: Array,
  lyricsTheme: String,
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'albums',
      autopopulate: {maxDepth: 2},
    }
  ],
  videos: Array,
  socials: Object,
  photos: Array,
  logo: String,
  description: '',
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
bandsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
bandsSchema.plugin(require('mongoose-autopopulate'))
const Bands = mongoose.model('bands', bandsSchema, 'bands')

module.exports = Bands
