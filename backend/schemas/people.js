const mongoose = require("mongoose")
const { Schema } = mongoose

const peopleSchema = new mongoose.Schema({
  realName: String,
  stageName: String,
  bands: [
    {
      type: Schema.Types.ObjectId,
      ref: 'bands',
      autopopulate: true,
    },
  ],
  sex: String,
  birthdate: {
    type: Date,
    default: null,
  },
  birthCountry: String,
  instruments: String,
  photo: String,
}, {
  versionKey: false,
  timestamps: true,
})

const People = mongoose.model('people', peopleSchema, 'people')

module.exports = People
