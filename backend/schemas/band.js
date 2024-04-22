const mongoose = require("mongoose")
const { Schema } = mongoose

const bandsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  formedIn: String,
  yearsActive: String,
  label: String,
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: { maxDepth: 1 },
    },
  ],
  exLineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: { maxDepth: 1 },
    }
  ],
  country: String,
  city: String,
  status: {
    type: String,
    default: 'active',
  },
  genre: String,
  lyricsTheme: String,
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'albums',
      autopopulate: { maxDepth: 2 },
    }
  ],
  videos: Array,
  socials: {
    type: Object,
    default: {
      bandcamp: '',
      discogs: '',
      yaMusic: '',
      spotify: '',
    }
  },
  photos: Array,
  logoUrl: String,
  photoUrl: String,
  description: String,
}, {
  versionKey: false,
  timestamps: true,
})
bandsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
bandsSchema.plugin(require('mongoose-autopopulate'))
const Bands = mongoose.model('bands', bandsSchema, 'bands')

module.exports = Bands
