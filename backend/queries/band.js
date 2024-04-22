const db = require('../schemas')
const { jsonResponse } = require('../utils')

const Band = db.bands
const User = db.users

exports.getBands = async (req, res) => {
  let result
  if (req.query.id) {
    result = await Band.findById(req.query.id)
  } else {
    result = await Band.find({})
  }
  return jsonResponse(res, result)
}

exports.addBand = async (req, res) => {
  const bandExist = await Band.findOne({ id: req.body.id })
  if (bandExist) {
    return jsonResponse(res, null, 'Группа существует', false)
  }
  const artist = new Band(req.body)
  await artist.save()
  return jsonResponse(res, artist, null, true, 201)
}

exports.updateBand = async (req, res) => {
  const artist = await Band.findByIdAndUpdate(req.body._id, req.body, { new: true })
  return jsonResponse(res, artist)
}
