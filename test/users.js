const supertest = require('supertest');
const request = supertest('http://localhost:5050')
const chai = require('chai');
const expect = chai.expect;

describe('Users', () => {
    it('Get /api/users', (done) => {
        request.get('/api/users/').end((err, res) => {
            expect(res.body).to.not.be.empty;
            done();
        });
    });
});