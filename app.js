const winston = require('winston');
const express = require('express');
const app = express();

require('dotenv').config();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info('listening on port 3000');
});
