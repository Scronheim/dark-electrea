module.exports = {
  jsonResponse: function (res, data, error = null, success = true, code = 200) {
    return res.status(code).json({
      data,
      error,
      success,
    })
  },
  mongooseToJson: function (object) {
    return JSON.parse(JSON.stringify(object))
  },
  getRandomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
