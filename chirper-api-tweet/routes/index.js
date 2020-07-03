var express = require('express');
var router = express.Router();

let tweet = require('../controllers/tweet')

/* GET home page. */

router.post('/',tweet.submit_tweet);
router.get('/tweets',tweet.show_tweets);
router.get('/tweets/:tweet_id',tweet.show_tweet);

router.patch('/tweets/:tweet_id',tweet.edit_tweet);
router.delete('/tweets/:tweet_id',tweet.delete_tweet);
module.exports = router;
