const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 5;
            }
        },
        message: 'The name should have at least 5 characters'
    }
});

module.exports = mongoose.model('Genre', genreSchema);
