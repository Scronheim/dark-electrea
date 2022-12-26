const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Band = db.bands

exports.searchBand = async (req, res) => {
  let results
  const query = req.query.q
  const country = req.query.country
  if (query) {
    results = await Band.find({ title: new RegExp(query, 'iu') })
  } else if (country) {
    results = await Band.find({ countryOfOrigin: country })
  }
  return jsonResponse(res, results)
}

exports.searchBandsWithFilters = async (req, res) => {
  if (Object.keys(req.body).length === 0) return jsonResponse(res, [])
  const bands = await Band.find(req.body)
  return jsonResponse(res, bands)
}
