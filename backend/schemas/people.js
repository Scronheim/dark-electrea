const mongoose = require("mongoose")
const { Schema } = mongoose

const peopleSchema = new mongoose.Schema({
  realName: String,
  band: {
    type: Schema.Types.ObjectId,
    ref: 'bands',
    autopopulate: { maxDepth: 1 },
  },
  sex: String,
  birthdate: {
    type: Date,
    default: null,
  },
  country: {
    type: String,
    default: 'Unknown',
  },
  instruments: String,
  photo: String,
}, {
  versionKey: false,
  timestamps: true,
})

peopleSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
peopleSchema.plugin(require('mongoose-autopopulate'))
const People = mongoose.model('people', peopleSchema, 'people')

module.exports = People
