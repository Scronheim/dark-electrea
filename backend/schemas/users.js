const mongoose = require("mongoose")
const { Schema } = mongoose

const usersSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,
  },
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
    default: 'dark',
  },
}, {
  versionKey: false,
  timestamps: true,
})

usersSchema.plugin(require('./plugins/dateFormat').declareFormat('YYYY-MM-DD'))
usersSchema.plugin(require('mongoose-autopopulate'))
const Users = mongoose.model('users', usersSchema, 'users')

module.exports = Users
