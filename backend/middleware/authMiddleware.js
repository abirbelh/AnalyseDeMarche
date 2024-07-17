const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing!' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required!' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.utilisateurData = {
            utilisateurId: decoded.utilisateurId,
            role: decoded.role
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token!' });
    }
};

module.exports = authMiddleware;

