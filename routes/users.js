const _ = require('lodash');
const auth = require('../middlewares/auth');
const { Router } = require('express');
const { User, validate } = require('../models/user');
const bcrypt = require('bcryptjs');
const router = Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exists');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token') //permite que el cliente pueda leer el header de x-auth-token
            .send(_.pick(user, ['name', 'email', '_id']));
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
