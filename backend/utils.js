module.exports = {
  jsonResponse: function (res, data, error = null, success = true, code = 200) {
    return res.status(code).json({
      data: data,
      success: success,
      error: error,
    })
  }
}
