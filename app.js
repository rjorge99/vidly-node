const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use('/api/genres', require('./routes/genres'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
