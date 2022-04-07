const { Router } = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('Customer not found');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('Movie not found');

    if (movie.numberInStock === 0) return res.send('Movie not in stock');

    res.send('ex');
});

module.exports = router;
