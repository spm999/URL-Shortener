// Models/ShortURL.js
const mongoose = require('mongoose');

const shortURLSchema = new mongoose.Schema({
  shortURL: { type: String, required: true },
  longURL: { type: String, required: true },
  userId: { type: String, required: true } // Assuming userId is a string
});

module.exports = mongoose.model('ShortURL', shortURLSchema);
