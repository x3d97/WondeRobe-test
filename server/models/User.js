const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: Number,
});

module.exports = mongoose.model('User', UserSchema);