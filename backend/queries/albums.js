const jwt = require('jsonwebtoken')

const db = require('../schemas')
const { jsonResponse } = require('../utils')
const config = require('../config')

const Album = db.albums
const Band = db.bands
const Rating = db.ratings

exports.setAlbumRating = async (req, res) => {
  const token = req.headers['x-access-token']
  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) return ['Ошибка проверки токена']
    const rating = await Rating.findOneAndUpdate(
      { album: req.body.albumId, user: decoded._id },
      { rating: req.body.rating },
      { upsert: true, new: true }
    )
    const album = await Album.findOne({ _id: req.body.albumId })
    const ratingIndex = album.ratings.findIndex(r => r._id.toString() === rating._id.toString())
    if (ratingIndex === -1) {
      album.ratings.push(rating._id)
      await album.save()
    }
    return jsonResponse(res, album)
  })
}


exports.getAlbum = async (req, res) => {
  const album = await Album.findById(req.query._id)
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
