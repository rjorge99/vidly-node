const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (process.env.VALIDATE_TOKEN === 'false') return next();

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Token not provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
