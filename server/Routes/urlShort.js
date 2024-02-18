// urlShortener.js
const express = require('express');
const shortid = require('shortid');
const router = express.Router();

// Example database to store shortened URLs
const urlDatabase = {};

// Endpoint to shorten a URL
router.post('/shorten', async (req, res) => {
  try {
    const { longURL } = req.body;
    
    const shortURL = `https://url-shortener-tatk.onrender.com/${shortid.generate()}`; // Generate a short ID
    urlDatabase[shortURL] = longURL; // Store the long URL corresponding to the short URL
    
    res.json({ shortURL });
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to redirect to the original URL
router.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[`https://url-shortener-tatk.onrender.com/${shortURL}`];
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

module.exports = router;
