const { Router } = require('express');
const auth = require('../middlewares/auth');
const { validate, Customer } = require('../models/customer');
const router = Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().select('-__v').sort('name');
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    let customer = { ...req.body };
    const { error } = validate(customer);
    if (error) return res.status(400).send(error.details[0].message);

    customer = new Customer(customer);
    await customer.save();
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id).select('-__v');
    if (!customer) return res.status(404).send('Customer not found');

    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    let customer = { ...req.body };

    const { error } = validate(customer);
    if (error) return res.status(400).send(error.details[0].message);

    customer = await Customer.findByIdAndUpdate(req.params.id, customer, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');

    res.send(customer);
});

module.exports = router;
