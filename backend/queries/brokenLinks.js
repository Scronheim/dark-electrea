const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../schemas')
const config = require('../config')
const { jsonResponse, mongooseToJson } = require('../utils')

const BrokenLinks = db.brokenLinks


exports.getBrokenLinks = async (req, res) => {
  const links = await BrokenLinks.find({})
  return jsonResponse(res, links)
}

exports.addBrokenLinks = async (req, res) => {
  const linkExist = await BrokenLinks.findOne({ album: req.body.album, link: req.body.link })
  if (linkExist) {
    return jsonResponse(res, null, 'О неработающей ссылке уже сообщено. Спасибо!', false)
  }
  const links = new BrokenLinks(req.body)
  await links.save()
  return jsonResponse(res, links)
}

exports.deleteBrokenLink = async (req, res) => {
  await BrokenLinks.findByIdAndDelete(req.query._id)
  return jsonResponse(res)
}
