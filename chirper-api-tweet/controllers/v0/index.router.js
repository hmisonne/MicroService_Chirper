const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(__dirname, '../../', 'config/database.json'))[env];
const Axios = require('axios')

const tweetRouter = require('./tweet/routes/tweet.router')
const jwksUrl = 'https://fsnd-hm.auth0.com/.well-known/jwks.json'

async function requireAuth(req, res, next) {
    
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({message: 'No authorization headers.'});
    }
    try {
        const token = await verifyToken(req.headers.authorization)
        console.log('to', token)
        return next();
    } catch(e) {
        return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    
  }

function getToken(authHeader) {
    if (!authHeader) throw new Error('No authentication header')

    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header')

    const split = authHeader.split(' ')
    const token = split[1]

    return token
}

async function verifyToken(authHeader) {
    const token = getToken(authHeader)
    console.log('to1', token)
    let cert;
    try {
        const response = await Axios.get(jwksUrl);
        const pemData = response['data']['keys'][0]['x5c'][0];
        cert = `-----BEGIN CERTIFICATE-----\n${pemData}\n-----END CERTIFICATE-----`;
    } catch (err) {
        console.log(err);
    }
    return jwt.verify(token, cert, { algorithms: ['RS256'] }).sub
}

router.post('/',requireAuth, tweetRouter.submit_tweet);
router.get('/',tweetRouter.show_tweets);
router.get('/:tweet_id',tweetRouter.show_tweet);

router.patch('/:tweet_id',tweetRouter.edit_tweet);
router.delete('/:tweet_id',tweetRouter.delete_tweet);

module.exports = router;
