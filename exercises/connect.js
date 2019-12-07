const mongoose = require('mongoose')
//mongoose.Promise = global.Promise

const connect = (url) => {
  return mongoose.connect(url)
}//Promise.reject()

module.exports = connect
