const db = require('../schemas')
const { jsonResponse } = require('../utils')

const Album = db.albums
const Band = db.bands
const User = db.users


exports.getAlbum = async (req, res) => {
  const album = await Album.findById(req.query.id)
  return jsonResponse(res, album)
}

exports.addAlbum = async (req, res) => {
  const bandIdFilter = {}
  if (req.body.band) {
    bandIdFilter._id = req.body.band
  } else if (req.body.bandId) {
    bandIdFilter.id = req.body.bandId
  }
  const album = new Album(req.body)
  const band = await Band.findOne(bandIdFilter)
  band.albums.push(album._id)
  album.band = band._id
  await band.save()
  await album.save()

  return jsonResponse(res, album)
}

exports.updateAlbum = async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.body._id, req.body, { new: true })
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
