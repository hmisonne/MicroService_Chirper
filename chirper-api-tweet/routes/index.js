var express = require('express');
var router = express.Router();

let tweet = require('../controllers/tweet')

/* GET home page. */
router.get('/', tweet.get_tweets);
router.post('/',tweet.submit_tweet);
router.get('/tweets',tweet.show_tweets);
router.get('/tweet/:tweet_id',tweet.show_tweet);
router.get('/tweet/:tweet_id/edit',tweet.show_edit_tweet);
router.post('/tweet/:tweet_id/edit',tweet.edit_tweet);

module.exports = router;
