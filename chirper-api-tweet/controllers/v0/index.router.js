const express = require('express');
const router = express.Router();

const tweetRouter = require('./tweet/routes/tweet.router')


router.post('/',tweetRouter.submit_tweet);
router.get('/',tweetRouter.show_tweets);
router.get('/:tweet_id',tweetRouter.show_tweet);

router.patch('/:tweet_id',tweetRouter.edit_tweet);
router.delete('/:tweet_id',tweetRouter.delete_tweet);

module.exports = router;
