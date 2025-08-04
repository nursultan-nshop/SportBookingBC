const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please login first.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET); // ✅ Түзетілді
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};
