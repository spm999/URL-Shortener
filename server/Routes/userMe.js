// const jwt = require('jsonwebtoken');
const express=require("express")
const authenticateToken = require('../Utils/authenticateToken');
const User = require('../Models/User');
const router = express.Router();


// Route to get current user's data
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Parse userId as an integer
        // console.log(userId)
        const user = await User.findOne({ userId: parseInt(userId, 10) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;