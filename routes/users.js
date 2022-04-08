const { Router } = require('express');
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const router = Router();

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

        res.send(_.pick(user, ['name', 'email', '_id']));
    } catch (error) {
        console.log(error);
    }
});
// router.get('/', (req, res) => {
//     const users = User.find();
//     res.send(users);
// });

module.exports = router;
