const dotenv = require('dotenv');

module.exports = function () {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        dotenv.config({ path: '.env.development' });
    } else {
        dotenv.config({ path: '.env.production' });
    }
};
