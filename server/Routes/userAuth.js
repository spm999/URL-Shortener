const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET
const router = express.Router();
const User = require('../Models/User');

// Sign Up route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password
            // Additional fields from my schema
        });

        // Save the user to the database
        await newUser.save();

        // console.log('Input Password:', password);
        // console.log('Stored Hashed Password:', hashedPassword);
        // console.log('Is Password Valid:', isPasswordValid);

        // Generate and send a JWT token for the newly created user
        const token = jwt.sign({ UserId: newUser._id }, secretKey, { expiresIn: '9h' });
        res.status(201).json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct without hashing the input password again
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate and send a JWT token
        const token = jwt.sign({ UserId: user._id }, secretKey);
        res.json({
            UserId: user.userId,
            login: true,
            authtoken: token,

        });

    } catch (error) {
        console.error(error);
        res.json({
            login: false,
            error: "Please check email and password"
        }

        );
    }
});


module.exports = router;