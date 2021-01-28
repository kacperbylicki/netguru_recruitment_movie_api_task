const request = require('supertest');

const SERVER_URL = "http://localhost:3001";

const authPremium = async () => {
    const { body: { token } } = 
            await request(SERVER_URL)
            .post('/api/v1/auth')
            .send({
                username: "premium-jim",
                password: "GBLtTyq3E_UNjFnpo9m6"
            });

    return {
        "Authorization": token
    };
};

const authBasic = async () => {
    const { body: { token } } = 
            await request(SERVER_URL)
            .post('/api/v1/auth')
            .send({
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8"
            });

    return {
        "Authorization": token
    };
};

describe('Get Movies with invalid JWT', () => {
    it('Should return statusCode 403', async () => {

        const headers = {
            "Authorization": "ebeebeebe"
        };

        const res = 
            await request(SERVER_URL)
            .get('/api/v1/movies')
            .set(headers);

        const { statusCode } = res;

        expect(statusCode).toEqual(403);
    });
});

describe('Get Movies with proper JWT', () => {
    it('Should return statusCode 200, count of type number and data of type object', async () => {
        const headers = await authPremium();

        const res = 
            await request(SERVER_URL)
            .get('/api/v1/movies')
            .set(headers);

        const { statusCode, body: { count, data } } = res;

        expect(statusCode).toEqual(200);
        expect(typeof count).toEqual('number');
        expect(typeof data).toEqual('object');
    });
});

describe('Set Movie with invalid JWT', () => {
    it('Should return statusCode 403', async () => {

        const headers = {
            "Authorization": "ebeebeebe"
        };

        const res = 
            await request(SERVER_URL)
            .post('/api/v1/movies')
            .set(headers)
            .send({
                title: "Ant-Man",
            });

        const { statusCode } = res;

        expect(statusCode).toEqual(403);
    });
});

describe('Set Movie that not exists in DB (and not exists in OMDB records) with proper JWT', () => {
    it('Should return statusCode 200, insert: 0, result: movie_not_found, data: []', async () => {
        const headers = await authPremium();

        const res = 
            await request(SERVER_URL)
            .post('/api/v1/movies')
            .set(headers)
            .send({
                title: "ebebebeababab",
            });

        const { statusCode, body: { insert, result, data } } = res;

        expect(statusCode).toEqual(200);

        expect(typeof insert).toEqual('number');
        expect(insert).toEqual(0);

        expect(typeof result).toEqual('string');
        expect(result).toEqual('movie_not_found');

        expect(typeof data).toEqual('object');
        expect(data).toEqual([]);
    });
});


describe('Set Movie that not exists in DB (but exists in OMDB records) with proper JWT', () => {
    it('Should return statusCode 200, insert: 1, result: movie_inserted_successfully, data object', async () => {
        const headers = await authPremium();

        const res = 
            await request(SERVER_URL)
            .post('/api/v1/movies')
            .set(headers)
            .send({
                title: "Ant-Man",
            });

        const { statusCode, body: { insert, result, data } } = res;

        expect(statusCode).toEqual(200);

        expect(typeof insert).toEqual('number');
        expect(insert).toEqual(1);

        expect(typeof result).toEqual('string');
        expect(result).toEqual('movie_inserted_successfully');

        expect(typeof data).toEqual('object');
    });
});

describe('Set Movie that exists in DB with proper JWT', () => {
    it('Should return statusCode 200, insert: 0, result: movie_exists, data: []', async () => {
        const headers = await authPremium();

        const res = 
            await request(SERVER_URL)
            .post('/api/v1/movies')
            .set(headers)
            .send({
                title: "Ant-Man",
            });

        const { statusCode, body: { insert, result, data } } = res;

        expect(statusCode).toEqual(200);

        expect(typeof insert).toEqual('number');
        expect(insert).toEqual(0);

        expect(typeof result).toEqual('string');
        expect(result).toEqual('movie_exists');

        expect(typeof data).toEqual('object');
        expect(data).toEqual([]);
    });
});

describe('Test if basic role User cannot add more than 5 movies', () => {
    const movies = ["Tenet", "Interstellar", "Martian", "Joker", "Inception", "The Godfather"];

    it('Should return statusCode 403, error: monthly_usage_exceed', 
        async () => {
            const headers = await authBasic();

            let res;

            for (movie of movies) {

                res = await request(SERVER_URL)
                .post('/api/v1/movies')
                .set(headers)
                .send({
                    title: movie
                });
        
            };

            const { statusCode, body: { error } } = res;

            expect(statusCode).toEqual(403);

            expect(typeof error).toEqual('string');
            expect(error).toEqual('monthly_usage_exceed');
            
        }
    ); 
});
