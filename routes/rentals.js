const { Router } = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');
const router = Router();

Fawn.init('mongodb://localhost/vidly');

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

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update(
                'movies',
                { _id: movie._id },
                {
                    $inc: { numberInStock: -1 }
                }
            )
            .run();

        res.send(movie);
    } catch (error) {
        res.status(500).send('An error has occurred while saving');
    }
});

module.exports = router;
