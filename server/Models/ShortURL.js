const mongoose = require('mongoose');

const shortURLSchema = new mongoose.Schema({
  shortURL: { type: String, required: true },
  longURL: { type: String, required: true },
  userId: { type: String, required: true }, // Assuming userId is a string
  visitCount: { type: Number, default: 0 }, // Number of times the URL has been visited
  visits: [{ timestamp: { type: Date, default: Date.now } }] // Array to store timestamps of visits
});

module.exports = mongoose.model('ShortURL', shortURLSchema);
