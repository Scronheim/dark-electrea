const mongoose = require("mongoose")
const { Schema } = mongoose

const peopleSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
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
