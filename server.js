require('dotenv').config()

const express = require('express')

const path = require('path')

const compression = require('compression')

const helmet = require('helmet')

const uuidv4 = require('uuid/v4')

const ua = require('universal-analytics')

const PORT = process.env.PORT || 5000

const app = express()

global.__basedir = path.dirname(__filename)

app.enable('trust proxy')

app.use(express.static(path.join(global.__basedir, 'public')))

app.use(helmet())
app.use(compression())

app.get('*', (req, res, next) => {
  const visitor = ua(process.env.ANALYTICS_CODE, uuidv4())
  visitor.pageview('/damagecalculator').send()

  res.sendFile(path.join(global.__basedir, 'public/index.html'))
})

app.set('port', PORT)

app.listen(app.get('port'))
console.log(`app started on port ${app.get('port')}`)
