const request = require('supertest')
const app = require('../app.js')
const db = require('../controllers/v0/tweet/models/index.js')

// Test Token retrieve from Auth0
const testToken = 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UTTJRVGsxT1VJME5rUTRRekZDUXpnM1FUUXlRMFEwUXpneE5UZERNVEl5TVVGRU1qVTFSZyJ9.eyJpc3MiOiJodHRwczovL2ZzbmQtaG0uYXV0aDAuY29tLyIsInN1YiI6Ink0cVo5VFI4SVVzdmZjMlNialV6N3d2VUpxeFJhVjFDQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2ZzbmQtaG0uYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1OTQwODMxMTMsImV4cCI6MTU5NDE2OTUxMywiYXpwIjoieTRxWjlUUjhJVXN2ZmMyU2JqVXo3d3ZVSnF4UmFWMUMiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.hYD0jcdYJf4FTE689_8cTjsnou1f-ThksIOpKaCRkCWovxeEn7rxqjvGtAfTG7AlTBXMcQpJdHMvX27zVS2UFiYDxFoyJLP8KfFpkE0l6ZoyBpo-VKloiKsmb3IT_mQQMl5ocJ2ZHABjgyW-u_HbMEtZr4Ni2vY9vRCqwayqNBVvKAvtYUmTE_W3WI4-vNlPqs94t0EsZx5cJVpKM8GmXQE0LsJ_0sL1BBarmvjaSK_9l6PLzkQ2pFMdLj-1jTyLuMI8KyilACPCUlfTLM3PxH4KRhuryArjxmXK0u2jqsxZ1t2cnzuTtxjcq2yA5mZRAbaStBznMXQ74bD6X7YARg'

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
            .set('Authorization', testToken)
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
            .set('Authorization', testToken)
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

