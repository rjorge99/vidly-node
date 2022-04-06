const { Router } = require('express');
const { validate, Customer } = require('../models/customer');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');

        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        let customer = { ...req.body };

        const { error } = validate(customer);
        if (error) return res.status(400).send(error.details[0].message);

        customer = new Customer(customer);
        customer = await customer.save();

        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let customer = { ...req.body };

        const { error } = validate(customer);
        if (error) return res.status(400).send(error.details[0].message);

        customer = await Customer.findByIdAndUpdate(req.params.id, customer, { new: true });

        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');

        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
