const { Router } = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const Joi = require('Joi');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid user or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid user or password');

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

        res.send(token);
    } catch (error) {
        console.log(error);
    }
});

const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
};

module.exports = router;
