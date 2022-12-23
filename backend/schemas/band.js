const mongoose = require("mongoose")
const { Schema } = mongoose

const bandsSchema = new mongoose.Schema({
  title: String,
  formedIn: Number,
  label: String,
  lineup: [
    {
      type: Schema.Types.ObjectId,
      ref: 'people',
      autopopulate: true,
    },
  ],
  countryOfOrigin: String,
  city: String,
  yearsActive: String,
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
      autopopulate: true,
    }
  ],
  videos: Array,
  socials: Object,
  photos: Array,
  logo: String,
  description: '',
  links: Object,
}, {
  versionKey: false,
  timestamps: true,
})

bandsSchema.plugin(require('mongoose-autopopulate'))
const Bands = mongoose.model('bands', bandsSchema, 'bands')

module.exports = Bands
