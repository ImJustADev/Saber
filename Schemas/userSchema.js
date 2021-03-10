const mongoose = require('mongoose')

const s = {
  type: String,
  required: true,
}

const s1 = {
  type: String,
  required: false,
}

const a = {
  type: Array,
  required: false,
}

const i = {
  type: Number,
  required: false,
}

const b = {
  type: Boolean,
  required: false,
}

const userSchema = mongoose.Schema({

  // Discord
  _id: s,
  discord: s,
  userID: s,
  userTag: s,
  xp: i,
  level: i,
  rank: i,
  preferences: a,
  region: s1,
  location: s1,
  nickname: s1,

  // Nintendo Switch
  switchFriends: a,
  switchCode: s1,
  switchPrivacy: s,

  //Socials
  twitter: s1,
  youtube: s1,
  spotify: s1,
  steam: s1,
  twitch: s1,
  telegram: s1,

  // Booleans
  hasSubscription: b,
  hasSmash: b,

  // Stats
  playTime: i,
  wins: i,
  losses: i,
  kills: i,
  deaths: i,
  kdr: i,

  // Smash Preferences
  mains: a,
  stages: a,
  counter_picks: a,
  rule_set: a,
  p_chars: a,
  p_stages: a,
  p_region: a,
  p_prefs: a,

  },
  {
    timestamps: true,
  }
  )

module.exports = mongoose.model('users', userSchema)