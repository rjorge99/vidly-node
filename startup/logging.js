const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    // process.on('uncaughtException', (err) => { winston.error(err.message, err); process.exit(1); });

    process.on('unhandledRejection', (err) => {
        throw err; // se vuelve un uncaughtexception y es atrapado por wintson
        // winston.error(err.message, err); process.exit(1);
    });

    winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtException.log' }));
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // winston.add(new winston.transports.Console());
    // winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));
};
