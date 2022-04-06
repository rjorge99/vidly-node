const express = require('express');
const connectMongo = require('./database/db-config');
const app = express();

//Database
connectMongo();

// Middlewares
app.use(express.json());
app.use('/api/genres', require('./routes/genres'));
app.use('/api/customers', require('./routes/customers'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
