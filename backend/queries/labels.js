const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Label = db.labels

exports.getLabels = async (req, res) => {
  let result
  if (req.query.id) {
    result = await Label.findById(req.query.id)
  } else {
    result = await Label.find({})
  }
  return jsonResponse(res, result)
}

exports.addLabel = async (req, res) => {
  const label = new Label(req.body)
  await label.save()
  return jsonResponse(res, label)
}

exports.updateLabel = async (req, res) => {
  const label = await Label.findByIdAndUpdate(req.body._id, req.body, {new: true})
  return jsonResponse(res, label)
}
