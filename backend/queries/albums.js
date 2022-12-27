const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Album = db.albums
const Band = db.bands
const ObjectId = db.mongoose.Types.ObjectId

exports.getAlbum = async (req, res) => {
  const album = await Album.findById(req.query.id)
  return jsonResponse(res, album)
}

exports.addAlbum = async (req, res) => {
  const album = new Album(req.body)
  await album.save()
  const band = await Band.findById(req.body.band)
  band.albums.push(album._id)
  await band.save()
  return jsonResponse(res, album)
}

exports.updateAlbum = async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, album)
}

exports.deleteAlbum = async (req, res) => {
  await Album.findByIdAndDelete(req.body._id)
  const band = await Band.findById(req.body.band._id)
  const albumIndex = band.albums.findIndex(i => i._id.toString() === req.body._id)
  band.albums.splice(albumIndex, 1)
  band.save()
  return jsonResponse(res, band)
}
