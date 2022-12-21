const db = require('../schemas')
const {jsonResponse} = require('../utils')

const People = db.people

exports.addPerson = async (req, res) => {
  const person = new People(req.body)
  await person.save()
  return jsonResponse(res, person)
}

exports.updatePerson = async (req, res) => {
  const person = await People.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, person)
}
