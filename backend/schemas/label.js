const mongoose = require("mongoose")
const { Schema } = mongoose

const labelsSchema = new mongoose.Schema({
  title: String,
  country: String,
  birthdate: {
    type: Date,
    default: null,
  },
  email: String,
  address: String,
  phone: String,
  links: Object,
}, {
  versionKey: false,
  timestamps: true,
})

labelsSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
const Labels = mongoose.model('labels', labelsSchema, 'labels')

module.exports = Labels
