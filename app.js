#!/usr/bin/env node

const express = require('express')
const app = express()

const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const engines = require('consolidate')

const config = require('./config')
const logger = require('./logging')

// view engine setup
app.set('views', './views')
app.set('view engine', 'njk')
app.engine('njk', engines.nunjucks)

// DB Connection
mongoose.set('debug', config.db.debug)
mongoose.connect(config.db.connection_string, {
  poolSize: 5,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
})
mongoose.Promise = global.Promise

// use morgan to log at command line
if (config.general.test === false) {
  app.use(morgan('combined'))
}

// parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

// static files
app.use(express.static('./public'))

// install routes
app.use('/', require('./routes/home'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404

  next(err)
})

// error handler
app.use(function (err, req, res) {
  //
  if (err.status !== 404) {
    logger.error(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + listener.address().port)
})

module.exports = app
