const express = require('express');
const error = require('../middlewares/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/genres', require('../routes/genres'));
    app.use('/api/customers', require('../routes/customers'));
    app.use('/api/movies', require('../routes/movies'));
    app.use('/api/rentals', require('../routes/rentals'));
    app.use('/api/users', require('../routes/users'));
    app.use('/api/auth', require('../routes/auth'));
    app.use(error);
};
