const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Artist = db.artists

exports.getArtists = async (req, res) => {
  let result
  if (req.query.id) {
    result = await Artist.findById(req.query.id)
  } else {
    result = await Artist.find({})
  }
  return jsonResponse(res, result)
}

exports.addArtist = async (req, res) => {
  const artist = new Artist(req.body)
  await artist.save()
  return jsonResponse(res, artist)
}

exports.updateArtist = async (req, res) => {
  const artist = await Artist.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, artist)
}
