const Joi = require('joi');
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

const validate = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(genre);
};

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.validate = validate;
