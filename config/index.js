const fs = require('fs')
const yaml = require('js-yaml')

const init = () => {
  let config = {}
  try {
    config = yaml.safeLoad(fs.readFileSync('./config/dev.yml', 'utf8'))
  } catch (e) {
    console.log(e)
  }
  return config
}

module.exports = init()
