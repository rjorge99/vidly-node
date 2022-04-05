const Joi = require('joi');
const { Router } = require('express');
const Genre = require('../models/genre');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        if (!genre) return res.status(404).send('Genre not found');

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let genre = new Genre({ name: req.body.name });
        genre = genre.save();

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        // const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const genre = await Genre.findById(req.params.id);

        if (!genre) return res.status(404).send('Genre not found');
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        genre.set({
            name: req.body.name
        });
        const result = await genre.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);

        if (!genre) return res.status(404).send('Genre not found');

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(genre);
};

module.exports = router;
