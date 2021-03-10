const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const guildSchema = mongoose.Schema({
  _id: reqString,
  guildID: reqString,
  name: reqString,
  owner: reqString,
})
module.exports = mongoose.model('guilds', guildSchema)