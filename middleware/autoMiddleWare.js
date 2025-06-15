const jwt=require('jsonwebtoken');

const protect = (req, res, next) => {
    let token=req.headers.authorization;

    // Check if token is provided in headers
    if (token && token.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = token.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to request object
            req.user =decoded;

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};


module.exports = {protect, adminOnly};