const winston = require('winston')

const config = require('./config')

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: config.logging.path,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      timestamp: true,
      colorize: true
    })
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message.slice(0, -1))
  }
}

module.exports = logger
