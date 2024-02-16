const express = require('express');
const router = express.Router();
const ShortURL = require('../Models/ShortURL');
const authenticateToken = require('../Utils/authenticateToken'); // Import your authentication middleware

// Endpoint to fetch short URLs for a specific user from the database, accessible only to authorized users
router.get('/:userId/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Fetch all short URLs from the database for the specific user
    const userShortURLs = await ShortURL.find({ userId });

    res.json({ shortURLs: userShortURLs });
  } catch (error) {
    console.error('Error fetching short URLs:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
