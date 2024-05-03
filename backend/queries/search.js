const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const dayjs = require('dayjs')
dayjs.extend(utc)
dayjs.extend(timezone)
const SpotifyWebApi = require('spotify-web-api-node')

const db = require('../schemas')
const { jsonResponse, getRandomNumber } = require('../utils')

const Band = db.bands
const Album = db.albums
const Label = db.labels

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    spotifyApi.setAccessToken(data.body['access_token'])
  },
)

exports.searchAlbumOnSpotify = async (req, res) => {
  const { body } = await spotifyApi.searchAlbums(req.query.q, { limit: 3 })
  return jsonResponse(res, body.albums.items)
}


exports.getRandomBand = async (req, res) => {
  const filters = {}
  if (req.query.country) {
    filters.country = req.query.country
  }
  if (req.query.genre) {
    filters.genre = new RegExp(req.query.genre, 'i')
  }
  if (req.query.status) {
    filters.status = req.query.status
  }
  if (req.query.formedIn) {
    filters.formedIn = req.query.formedIn
  }

  const bandCount = await Band.find(filters).count()
  const randomNumber = getRandomNumber(1, bandCount)
  const band = await Band.find(filters).limit(-1).skip(randomNumber)

  return jsonResponse(res, band)
}

exports.getAlbumsCount = async (req, res) => {
  const albumCount = await Album.count()

  return jsonResponse(res, albumCount)
}

exports.getBandCount = async (req, res) => {
  const bandCount = await Band.count()

  return jsonResponse(res, bandCount)
}

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
    filter.releaseDate = { $gt: startDate, $lt: endDate }
  }
  const albums = await Album.find(filter)
  return jsonResponse(res, albums)
}

exports.searchLabelsWithFilters = async (req, res) => {
  if (Object.keys(req.body).length === 0) return jsonResponse(res, [])
  const labels = await Label.find(req.body)
  return jsonResponse(res, labels)
}


exports.refreshSpotifyToken = () => {
  spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log('The access token has been refreshed!')

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token'])
      console.log('The access token is ' + data.body['access_token'])
      console.log('The token expires in ' + data.body['expires_in'])
    },
    function (err) {
      console.log('Could not refresh access token', err);
    });
};