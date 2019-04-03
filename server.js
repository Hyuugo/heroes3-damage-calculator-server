require('dotenv').config()

const express = require('express')

const path = require('path')

const compression = require('compression')

const helmet = require('helmet')

const morgan = require('morgan')

const counter = require('yametrika').counter({id: process.env.YAMETRIKA})

const robots = require('express-robots-txt')

const favicon = require('serve-favicon')

const PORT = process.env.PORT || 5000

const app = express()

global.__basedir = path.dirname(__filename)

app.enable('trust proxy')

app.use('public', express.static(path.join(global.__basedir, 'public')))

app.use('/css', express.static(path.join(global.__basedir, 'public', 'css')))

app.use('/js', express.static(path.join(global.__basedir, 'public', 'js')))

app.use('/fonts', express.static(path.join(global.__basedir, 'public', 'fonts')))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(helmet())
app.use(compression())
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('tiny'))
}

app.use(robots({
  UserAgent: '*', 
  Allow: '*'
}))

app.get('/', (req, res, next) => {
  counter.req(req)
  counter.hit('/')

  res.sendFile(path.join(global.__basedir, 'public', 'index.html'))
})

app.get('*', (req, res, next) => {
  res.redirect('/')
})

app.set('port', PORT)

app.listen(app.get('port'))
console.log(`app started on port ${app.get('port')}`)
