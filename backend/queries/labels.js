const db = require('../schemas')
const {jsonResponse} = require('../utils')

const Label = db.labels

exports.getLabels = async (req, res) => {
  const labels = await Label.find({})
  return jsonResponse(res, labels)
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
