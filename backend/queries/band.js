const db = require('../schemas')
const {jsonResponse} = require('../utils')

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
  const artist = new Band(req.body)
  await artist.save()
  const user = await User.findById(req.body.userAdded)
  user.addedMaterials.bands += 1
  await user.save()
  return jsonResponse(res, artist)
}

exports.updateBand = async (req, res) => {
  const artist = await Band.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, artist)
}
