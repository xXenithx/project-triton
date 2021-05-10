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

    it('GET /api/users:Id', () => {
        return request.get(`/api/users/${userId}`)
        .then((res) => {
            expect(res.body.id).to.equal(userId);
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

    it('DELETE /api/users/:id', () => {
        return request.delete(`/api/users/${userId}`)
        .then((res) => {
            expect(res.body.message).to.equal(`User ${userId} was successfully deleted.`)
        });
    });
});