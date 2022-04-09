const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    const db = process.env.DB;
    mongoose.connect(db).then(() => {
        winston.info(`Connected to ${db}`);
    });
};
