const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        req.user = decoded; // Add decoded user information to the request object
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = authenticateToken;