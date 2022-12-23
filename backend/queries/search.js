const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Band = db.bands

exports.searchArtist = async (req, res) => {
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

