const db = require('../schemas')
const { jsonResponse } = require('../utils')

const People = db.people
const Band = db.bands

exports.searchPerson = async (req, res) => {
  const query = req.query.q
  const person = await People.find({ $or: [{ realName: new RegExp(query, 'iu') }, { stageName: new RegExp(query, 'iu') }] })
  return jsonResponse(res, person)
}

exports.addPerson = async (req, res) => {
  const insertedIds = await People.insertMany(req.body)
  const band = await Band.findOne({ _id: req.body[0].band })

  insertedIds.forEach(async (member, index) => {
    if (req.body[index].ex) {
      if (!band.exLineup.includes(member._id)) {
        band.exLineup.push(member._id)
      }
    } else {
      if (!band.lineup.includes(member._id)) {
        band.lineup.push(member._id)
      }
    }
  })
  await band.save()

  return jsonResponse(res, null, null, true, 201)
}

exports.updatePerson = async (req, res) => {
  const person = await People.findByIdAndUpdate(req.body._id, req.body, { new: true })
  return jsonResponse(res, person)
}
