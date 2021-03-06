const { Router } = require('express');
const { Genre, validate } = require('../models/genre');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const router = Router();
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', async (req, res) => {
    const genres = await Genre.find().select('-__v ').sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = new Genre({ name: req.body.name });
        await genre.save();

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre not found');

    genre.set({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

module.exports = router;
