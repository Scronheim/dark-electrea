const mongoose = require("mongoose")
const { Schema } = mongoose

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
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

const Users = mongoose.model('users', usersSchema, 'users')

module.exports = Users
