const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/validation')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    winston.info('listening on port 3000');
});

module.exports = server;
