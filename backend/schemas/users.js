const mongoose = require("mongoose")
const { Schema } = mongoose

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  addedMaterials: {
    bands: {
      type: Number,
      default: 0,
    },
    albums: {
      type: Number,
      default: 0,
    },
    videos: {
      type: Number,
      default: 0,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'light',
  },
}, {
  versionKey: false,
  timestamps: true,
})

usersSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
const Users = mongoose.model('users', usersSchema, 'users')

module.exports = Users
