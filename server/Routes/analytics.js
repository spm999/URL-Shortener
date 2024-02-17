const express = require('express');
const router = express.Router();
const ShortURL = require('../Models/ShortURL');

// GET endpoint to retrieve analytics data for a specific shortened URL
router.get('/:urlId/analytics', async (req, res) => {
  try {
    const { urlId } = req.params;

    // Find the ShortURL document by ID
    const shortURL = await ShortURL.findById(urlId);

    if (!shortURL) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Send analytics data (e.g., visit count and timestamps)
    res.json({
      visitCount: shortURL.visitCount,
      visits: shortURL.visits
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
