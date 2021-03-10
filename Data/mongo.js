const mongoose = require('mongoose')
const config = require('../config.json')
const mongoPath = config.MONGO_DB;

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return mongoose
}