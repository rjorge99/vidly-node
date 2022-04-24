const { Router } = require('express');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const router = Router();

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    const { customerId, movieId } = req.body;
    const rental = await Rental.lookup(customerId, movieId);
    // const rental = await Rental.findOne({ 'customer._id': customerId, 'movie._id': movieId });

    if (!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('The rental has been already returned');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie._id }, { $inc: { numberInStock: 1 } });
    res.send(rental);
});

function validateReturn(request) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(request);
}

module.exports = router;
