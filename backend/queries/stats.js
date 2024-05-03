const db = require('../schemas')
const { jsonResponse } = require('../utils')

const Band = db.bands
const Album = db.albums
const People = db.people

exports.getStats = async (req, res) => {
  const bandsCount = await Band.count()
  const activeBandsCount = await Band.find({ status: 'Active' }).count()
  const onHoldBandsCount = await Band.find({ status: 'On hold' }).count()
  const splitUpBandsCount = await Band.find({ status: 'Split-up' }).count()
  const changeNameBandsCount = await Band.find({ status: 'Changed name' }).count()
  const unknownBandsCount = await Band.find({ status: 'Unknown' }).count()
  const albumsCount = await Album.count()
  const peopleCount = await People.count()

  const results = {
    bandsCount,
    activeBandsCount,
    onHoldBandsCount,
    splitUpBandsCount,
    changeNameBandsCount,
    unknownBandsCount,
    albumsCount,
    peopleCount
  }
  return jsonResponse(res, results)
}

