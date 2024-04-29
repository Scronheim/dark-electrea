const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const db = require('./schemas')
const config = require('./config')
const { mongooseToJson, jsonResponse } = require('./utils')

db.mongoose.connect('mongodb://localhost:27017/dark-electrea', {
  user: 'scronheim',
  pass: 'it!admin*0',
})

const User = db.users

const app = express()
const router = new express.Router()

router.use(bodyParser.json({ limit: '50mb' }))
router.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

fs.readdir('./routes', (err, files) => {
  files.map(f => {
    router.use(require(`./routes/${f}`))
  })
})

app.use(cors())

app.use(router)

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
