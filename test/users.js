const supertest = require('supertest');
const request = supertest('http://localhost:5050')
const chai = require('chai');
const expect = chai.expect;

describe('Users', () => {
    let userId;
    it('GET /api/users', () => {
        return request.get('/api/users/').then((res) => {
            expect(res.body).to.not.be.empty;
        })
    });

    it('POST /api/users', () => {

        const data = {
            name: "Test Dummy",
            username: "test.dummy",
            password: "pass"
        };

        return request.post('/api/users')
        .send(data)
        .then((res) => {
            expect(res.body).to.deep.include(data);
            userId = res.body.id;
        });
    });

    it('PUT /api/users/:Id', () => {
        const data = {
            name: "Mr. Dummy"
        }
        return request.put(`/api/users/${userId}`)
        .send(data)
        .then((res) => {
            expect(res.body.message).to.equal("User was updated successfully.");
        });
    });
});