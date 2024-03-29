const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const authenticateToken = require('../Utils/authenticateToken');
const ShortURL = require('../Models/ShortURL');

// Endpoint to shorten a URL with JWT authentication
router.post('/:userId/url/short', authenticateToken, async (req, res) => {
  try {
    const { longURL } = req.body;
    const userId = parseInt(req.params.userId); // Parse userId as an integer

    const shortURL = `https://url-shortener-tatk.onrender.com/url/${shortid.generate()}`; // Generate a short ID
    
    // Create a new ShortURL document
    const newShortURL = new ShortURL({
      shortURL,
      longURL,
      userId // Assuming you have userId available in req.user after authentication
    });

    // Save the document to MongoDB
    await newShortURL.save();

    res.json({ shortURL });
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// DELETE endpoint to delete a short URL
router.delete('/shortURL/:urlId', async (req, res) => {
  try {
    const { urlId } = req.params;

    // Check if the URL exists
    const url = await ShortURL.findById(urlId);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Delete the URL from the database
    await ShortURL.findByIdAndDelete(urlId);

    res.status(204).send(); // Send a success response with status code 204 (No Content)
  } catch (error) {
    console.error('Error deleting URL:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET endpoint to retrieve a specific shortened URL by its shortlink
router.get('/url/:shortlink', async (req, res) => {
  try {
    const { shortlink } = req.params;

    // Find the corresponding longURL in MongoDB based on the shortURL
    const shortURLDoc = await ShortURL.findOne({ shortURL: `https://url-shortener-tatk.onrender.com/url/${shortlink}` });

    if (shortURLDoc) {
      // Increment visit count and store timestamp
      shortURLDoc.visitCount++;
      shortURLDoc.visits.push({ timestamp: new Date() });
      await shortURLDoc.save();

      res.redirect(shortURLDoc.longURL);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Error retrieving URL:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
