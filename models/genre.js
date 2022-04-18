const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 50
    }
});

const validate = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
};

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.genreSchema = genreSchema;
module.exports.validate = validate;
