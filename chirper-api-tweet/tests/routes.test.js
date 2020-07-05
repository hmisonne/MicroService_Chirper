const request = require('supertest')
const app = require('../app.js')
describe('User API', () => {
    it('should show all tweets', async () => {
        const res = await request(app).get('/api/v0/tweet')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('tweets')
    }),
    it('should show a tweet', async () => {
        const res = await request(app)
        	.get('/api/v0/tweet/98f9331d-459d-4f13-8d6a-4be5528bf423')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('tweet')
    }),
    it('should update a tweet', async () => {
        const res = await request(app)
            .patch('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
            .send({
                text: 'Updated'
            })
        expect(res.statusCode).toEqual(200)
    }),
    it('should create a new tweet', async () => {
        const res = await request(app)
        	.post('/api/v0/tweet')
        	.send({
        		text: 'My test Tweet',
        		author: 'TestAuthor'
        	})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('tweet')
    }),
    it('should delete a tweet', async () => {
        const res = await request(app)
        	.del('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
        expect(res.statusCode).toEqual(200)
    })
    
})