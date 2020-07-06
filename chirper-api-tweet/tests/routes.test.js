const request = require('supertest')
const app = require('../app.js')
const db = require('../controllers/v0/tweet/models/index.js')

describe('Tweet API', () => {
    it('GET TWEET should show all tweets', async () => {
        const res = await request(app).get('/api/v0/tweet')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body).toHaveProperty('tweets')
    }),
    it('GET TWEET/{ID} should show a tweet', async () => {
        const res = await request(app)
        	.get('/api/v0/tweet/98f9331d-459d-4f13-8d6a-4be5528bf423')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body).toHaveProperty('tweet')
    }),
    it('GET TWEET/{ID} should show an error message if tweet id does not exist', async () => {
        const res = await request(app)
        	.get('/api/v0/tweet/INVALIDID')
        expect(res.statusCode).toEqual(500)
        expect(res.body.success).toEqual(false)
        expect(res.body).toHaveProperty('error')
    }),
    it('PATCH TWEET/{ID} should update a tweet with text', async () => {
        const res = await request(app)
            .patch('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
            .send({
                text: 'Updated'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
    }),
    it('PATCH TWEET/{ID} should update a tweet with replies', async () => {
        const res = await request(app)
            .patch('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
            .send({
                replies: '98f9331d-459d-4f13-8d6a-4be5528bf423'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
    }),
    it('PATCH TWEET/{ID} should show an error message if parameters missing in body', async () => {
       const res = await request(app)
            .patch('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
            .send({
                wrong_param: 'Updated'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body).toHaveProperty('error')
    }),
    it('PATCH TWEET/{ID} should show an error message if tweet id does not exist', async () => {
       const res = await request(app)
            .patch('/api/v0/tweet/INVALIDID')
            .send({
                text: 'Updated'
            })
        expect(res.statusCode).toEqual(500)
        expect(res.body.success).toEqual(false)
        expect(res.body).toHaveProperty('error')
    }),
    it('POST TWEET should create a new tweet', async () => {
        const res = await request(app)
        	.post('/api/v0/tweet')
        	.send({
        		text: 'My test Tweet',
        		author: 'TestAuthor'
        	})
        expect(res.statusCode).toEqual(201)
        expect(res.body.success).toEqual(true)
        expect(res.body).toHaveProperty('tweet')
    }),
    it('POST TWEET should show an error message if a parameter is missing in the body', async () => {
        const res = await request(app)
        	.post('/api/v0/tweet')
        	.send({
        		text: 'My test Tweet',
        	})
        expect(res.statusCode).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error).toEqual("Missing text and/or author")
    }),
    it('DELETE TWEET/{ID} should delete a tweet', async () => {
        const res = await request(app)
        	.del('/api/v0/tweet/46ab8e66-f3a4-48ae-a9e4-040ca0b29186')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
    }),
    it('DELETE TWEET/{ID} should show an error message if tweet id does not exist', async () => {
        const res = await request(app)
            .del('/api/v0/tweet/INVALIDID')
        expect(res.statusCode).toEqual(500)
        expect(res.body.success).toEqual(false)
        expect(res.body).toHaveProperty('error')
    }),
    afterAll(async done => {
	  // Closing the DB connection allows Jest to exit successfully.
	  db.sequelize.close();
	  done();
	});    
})

