const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Artist = db.artists

exports.searchArtist = async (req, res) => {
  const query = req.query.q
  const artists = await Artist.find({title: new RegExp(query, 'iu')})
  return jsonResponse(res, artists)
}

