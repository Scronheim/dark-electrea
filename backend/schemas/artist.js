const mongoose = require("mongoose")
const { Schema } = mongoose

const artistsSchema = new mongoose.Schema({
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
  albums: Array,
  videos: Array,
  social: Object,
  photos: Array,
  logo: String,
  description: '',
  links: Object,
}, {
  versionKey: false,
  timestamps: true,
})

artistsSchema.plugin(require('mongoose-autopopulate'))
const Artists = mongoose.model('artists', artistsSchema, 'artists')

module.exports = Artists
