const mongoose = require("mongoose")
const { Schema } = mongoose

const labelsSchema = new mongoose.Schema({
  title: String,
  country: String,
  email: String,
  address: String,
  phone: String,
  links: Object,
  logo: String,
}, {
  versionKey: false,
  timestamps: true,
})

const Labels = mongoose.model('labels', labelsSchema, 'labels')

module.exports = Labels
