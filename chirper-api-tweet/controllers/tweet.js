
const models = require('../models')

exports.get_tweets = function(req, res, next) {
  res.render('tweet', { title: 'Express' });
}

exports.submit_tweet = function(req, res, next) {
	
  return models.TweetItem.create({
  	content: req.body.tweet_text
  }).then(tweet => {
  	res.redirect('/')
  })
  
}