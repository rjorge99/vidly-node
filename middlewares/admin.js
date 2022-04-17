module.exports = function (req, res, next) {
    if (process.env.VALIDATE_TOKEN === 'false') return next();
    // 401 Unauthorized
    // 403 Forbidden
    if (!req.user.isAdmin) return res.status(403).send('Access denied, not permissions');

    next();
};
