const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const moment = require('moment');
const mongoose = require('mongoose');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    beforeEach(async () => {
        server = require('../../app');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title: '23456',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '23456',
                dailyRentalRate: 2
            }
        });

        await rental.save();
    });

    afterEach(async () => {
        await Rental.deleteMany({});
        await Movie.deleteMany({});
        await server.close();
    });

    it('should return 401 if client is not logged in', async () => {
        token = '';
        const response = await exec();
        expect(response.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const response = await exec();
        expect(response.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = '';
        const response = await exec();
        expect(response.status).toBe(400);
    });

    it('should return 404 if rental not found', async () => {
        await Rental.deleteMany({});
        const response = await exec();
        expect(response.status).toBe(404);
    });

    it('should return 400 if is already proccessed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const response = await exec();

        expect(response.status).toBe(400);
    });

    it('should return 200 if is a valid request', async () => {
        const response = await exec();
        expect(response.status).toBe(200);
    });

    it('should set the returnDate if input is valid', async () => {
        const response = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should set the rentalFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        const response = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rentalFee).toBe(14);
    });

    it('should increase the movie stock', async () => {
        const response = await exec();

        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return the rental in the body of the response', async () => {
        const response = await exec();
        const rentalInDb = await Rental.findById(rental._id);
        // expect(response.body).toHaveProperty('dateOut');
        // expect(response.body).toHaveProperty('dateReturned');
        // expect(response.body).toHaveProperty('rentalFee');
        // expect(response.body).toHaveProperty('customer');
        // expect(response.body).toHaveProperty('movie');

        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])
        );
    });
});
