const request = require('supertest')
const app = require('../app.js')
describe('User API', () => {
    it('should show all tweets', async () => {
        const res = await request(app).get('/api/v0/tweet')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('tweets')
    })
})