const db = require('../schemas')
const {jsonResponse} = require('../utils')

const People = db.people
const Band = db.bands

exports.searchPerson = async (req, res) => {
  const query = req.query.q
  const person = await People.find({$or:[{realName: new RegExp(query, 'iu')}, {stageName: new RegExp(query, 'iu')}]})
  return jsonResponse(res, person)
}

exports.addPerson = async (req, res) => {
  if (!req.body.bands.includes(req.body.band)) {
    req.body.bands.push(req.body.band)
  }
  const person = new People(req.body)
  await person.save()
  const band = await Band.findById(req.body.band)
  if (!band.lineup.includes(person._id)) {
    band.lineup.push(person._id)
    await band.save()
  }
  return jsonResponse(res, person)
}

exports.updatePerson = async (req, res) => {
  const person = await People.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, person)
}
