module.exports = {
  jsonResponse: function (res, data, error = null, success = true, code = 200) {
    return res.status(code).json({
      data: data,
      error: error,
    })
  },
  mongooseToJson: function (object) {
    return JSON.parse(JSON.stringify(object))
  },
}
