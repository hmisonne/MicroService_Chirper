
const models = require('../models')

exports.get_tweets = function(req, res, next) {
  res.render('tweet', { title: 'Express' });
}

exports.submit_tweet = function(req, res, next) {
  return models.TweetItem.create({
  	content: req.body.tweet_text
  }).then(tweet => {
  	res.redirect('/tweets')
  })
  
}

exports.show_tweets = function(req, res, next) {
  return models.TweetItem.findAll().then(tweets => {
  	res.render('tweet',{title: 'Express', tweets})
  })
  
}

exports.show_tweet = function(req, res, next) {
  return models.TweetItem.findOne({
  	where: {
  		id: req.params.tweet_id
  	}
  }).then(tweet => {
  	res.render('singleTweet',{tweet})
  })
  
}

exports.show_tweet = function(req, res, next) {
  return models.TweetItem.findOne({
	  where: {
	  		id: req.params.tweet_id
	  	}
	  }).then(tweet => {
  	res.render('singleTweet',{tweet})
  })
  
}

exports.show_edit_tweet = function(req, res, next) {
	return models.TweetItem.findOne({
	  	where: {
	  		id: req.params.tweet_id
	  	}
	  }).then(tweet => {
  	res.render('tweet/edit_tweet',{tweet})
  })
}


exports.edit_tweet = function(req, res, next) {
	return models.TweetItem.update({
	  	content: req.body.tweet_text
	  }, {
	  	where: {
	  		id: req.params.tweet_id
	  	}
	  }).then(result => {
	  	res.redirect('/tweet/'+ req.params.tweet_id);
	  })
}