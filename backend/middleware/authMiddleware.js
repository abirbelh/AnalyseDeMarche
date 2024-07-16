const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }
  try {
    const decodedToken = jwt.verify(token, 'your_jwt_secret');
    req.utilisateurId = decodedToken.utilisateurId;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

module.exports = authMiddleware;