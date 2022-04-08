const config = require('config');
const express = require('express');
const connectMongo = require('./database/db-config');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log('jwtPrivateKey not defined');
    process.exit(1);
}

//Database
connectMongo();

// Middlewares
app.use(express.json());
app.use('/api/genres', require('./routes/genres'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
