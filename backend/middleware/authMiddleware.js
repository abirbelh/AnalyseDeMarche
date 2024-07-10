// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your_jwt_secret');
    req.utilisateurData = { utilisateurId: decodedToken.utilisateurId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};