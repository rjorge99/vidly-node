const Joi = require('Joi');
const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 20
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 20
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const validate = (rental) => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(rental);
};

module.exports.Rental = mongoose.model('Rental', rentalSchema);
module.exports.validate = validate;
