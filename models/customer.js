const Joi = require('Joi');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const customerSchema = new Schema({
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
});

const validate = (customer) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().min(5).max(50),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
};

module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.validate = validate;
