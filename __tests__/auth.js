const request = require('supertest');

const SERVER_URL = "http://localhost:3001";

describe('Auth with wrong username and password', () => {
    it('Should return statusCode 401', async () => {
      const res = await request(SERVER_URL)
        .post('/api/v1/auth')
        .send({
          username: "basic-adam",
          password: "6PAwCD8"
        });

      expect(res.statusCode).toEqual(401);
    })
});

describe('Auth with valid username, but wrong password', () => {
    it('Should return statusCode 401', async () => {
      const res = await request(SERVER_URL)
        .post('/api/v1/auth')
        .send({
          username: "basic-thomas",
          password: "6PAwCD8"
        });

      expect(res.statusCode).toEqual(401);
    })
});

describe('Auth with valid username and password', () => {
    it('Should return statusCode 200 and token of length 255', async () => {
      const res = await request(SERVER_URL)
        .post('/api/v1/auth')
        .send({
          username: "basic-thomas",
          password: "sR-_pcoow-27-6PAwCD8"
        });

        const { statusCode, body: { token } } = res;

        expect(statusCode).toEqual(200);
        expect(token.length).toEqual(255)
    })
});