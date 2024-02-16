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

    const shortURL = `http://localhost:5172/${shortid.generate()}`; // Generate a short ID
    
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

// Endpoint to redirect to the original URL
// Endpoint to redirect to the original URL
// router.get('/:userId/url/:shortURL', async (req, res) => {
//     try {
//       const { shortURL, userId } = req.params; // Destructuring shortURL and userId from req.params
    
//       // Find the corresponding longURL in MongoDB based on userId and shortURL
//     //   const shortURLDoc = await ShortURL.findOne({ userId, shortURL });
//       const shortURLDoc = await shorturls.findOne({ userId, `http://localhost:5172/${shortURL}` });
      
//     //   const longURL = urlDatabase[`http://localhost:5172/${shortURL}`];

//       if (shortURLDoc) {
//         res.redirect(shortURLDoc.longURL);
//       } else {
//         res.status(404).json({ error: 'URL not found' });
//       }
//     } catch (error) {
//       console.error('Error retrieving URL:', error.message);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  
  

module.exports = router;
