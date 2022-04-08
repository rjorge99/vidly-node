const express = require('express');
const connectMongo = require('./database/db-config');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

//Database
connectMongo();

// Middlewares
app.use(express.json());
app.use('/api/genres', require('./routes/genres'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
