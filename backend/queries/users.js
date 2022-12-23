const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../schemas')
const config = require('../config')
const {jsonResponse, mongooseToJson} = require('../utils')

const User = db.users


exports.login = async (req, res) => {
  let user = await User.findOne({email: req.body.email})
  if (user) {
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return {auth: false, reason: 'Не верный email или пароль', token: null}
    const token = jwt.sign({_id: user._id}, config.secret, {
      expiresIn: 628000000, // expires in 31 days
    })
    delete user.password

    return jsonResponse(res, {auth: true, token: token, user: user})
  } else {
    return jsonResponse(res, {auth: false, token: null})
  }
}

exports.register = async (req, res) => {
  let user = await User.findOne({email: req.body.email})
  if (user) {
    return ['Email уже занят']
  }
  req.body.password = bcrypt.hashSync(req.body.password, 8)
  const newUser = new User(req.body)
  await newUser.save()
  const token = jwt.sign({_id: newUser._id}, config.secret, {
    expiresIn: 628000000, // expires in 31 days
  })
  return jsonResponse(res, {auth: true, token: token, user: newUser})
}

exports.changePassword = async (req, res) => {
  const newPassword = bcrypt.hashSync(req.body.password, 8)
  jsonResponse(res, User.findOneAndUpdate({email: req.body.email}, {password: newPassword}))
}

exports.aboutMe = async (req, res) => {
  const token = req.headers['x-access-token']
  if (!token) return ['Не указан токен']
  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) return ['Ошибка проверки токена']
    let user = await User.findById(decoded._id)
    user = mongooseToJson(user)
    delete user.password
    jsonResponse(res, user)
  })
}
