require('dotenv').config()
const express = require('express')
const path = require('path')
const counter = require('yametrika').counter({ id: process.env.YAMETRIKA })
const PORT = process.env.PORT || 5000

const app = express()

global.__basedir = path.dirname(__filename)

app.enable('trust proxy')

app.get('*', (req, res, next) => {
  counter.req(req)
  counter.hit('/')
  res.redirect(301, 'https://heroes3.tools/damage?from=heroku')
})

app.set('port', PORT)

app.listen(app.get('port'))
console.log(`app started on port ${app.get('port')}`)
