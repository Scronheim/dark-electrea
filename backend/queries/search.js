const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const dayjs = require('dayjs')

const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Band = db.bands
const Album = db.albums
const Label = db.labels

dayjs.extend(utc)
dayjs.extend(timezone)

exports.searchBand = async (req, res) => {
  let results
  const query = req.query.q
  const country = req.query.country
  if (query) {
    results = await Band.find({ title: new RegExp(query, 'iu') })
  } else if (country) {
    results = await Band.find({ country })
  }
  return jsonResponse(res, results)
}

exports.searchBandsWithFilters = async (req, res) => {
  if (Object.keys(req.body).length === 0) return jsonResponse(res, [])
  const bands = await Band.find(req.body)
  return jsonResponse(res, bands)
}

exports.searchAlbum = async (req, res) => {
  const results = await Album.find({ title: new RegExp(req.query.q, 'iu') })
  return jsonResponse(res, results)
}

exports.searchAlbumsWithFilters = async (req, res) => {
  if (Object.keys(req.body).length === 0) return jsonResponse(res, [])
  let filter = req.body
  if (filter.releaseDate) {
    const startDate = dayjs().year(filter.releaseDate).startOf('year')
    const endDate = dayjs().year(filter.releaseDate).endOf('year')
    filter.releaseDate = {$gt: startDate, $lt: endDate}
  }
  const albums = await Album.find(filter)
  return jsonResponse(res, albums)
}

exports.searchLabelsWithFilters = async (req, res) => {
  if (Object.keys(req.body).length === 0) return jsonResponse(res, [])
  const labels = await Label.find(req.body)
  return jsonResponse(res, labels)
}
