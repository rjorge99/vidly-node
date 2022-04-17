const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
// Joi.objectId = require('joi-objectid')(Joi);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const validate = (movie) => {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(50),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return Joi.validate(movie, schema);
};

module.exports.Movie = mongoose.model('Movies', movieSchema);
module.exports.validate = validate;
