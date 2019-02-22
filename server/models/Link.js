const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
  linkId: Number,
  userId: Number,
  longVersion: String,
  shortVersion: String,
  linkClicks: Number,
});

module.exports = mongoose.model('Link', LinkSchema);