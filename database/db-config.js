const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost/vidly');
        console.log('Connected to morgo DB');
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectMongo;
