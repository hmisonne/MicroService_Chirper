
const models = require('../models')



exports.submit_tweet = function(req, res, next) {
  return models.TweetItem.create({
  	text: req.body.tweet_text,
  	author: req.body.tweet_author,
  }).then(tweet => {
  	res.status(201).send({msg: "Success", tweet})
  })
  
}

exports.show_tweets = function(req, res, next) {
  return models.TweetItem.findAll().then(tweets => {
  	res.status(200).send(tweets)
  })
  
}


exports.show_tweet = function(req, res, next) {
  return models.TweetItem.findOne({
  	where: {
  		id: req.params.tweet_id
  	}
  }).then(tweet => {
  	res.status(200).send({msg: "Success", tweet})
  })
  
}


exports.edit_tweet = function(req, res, next) {
	return models.TweetItem.update({
	  	text: req.body.tweet_text
	  }, {
	  	where: {
	  		id: req.params.tweet_id
	  	}
	  }).then(result => {
	  	res.status(200).send({msg: "Success"});
	  })
}

exports.delete_tweet = function(req, res, next) {
	return models.TweetItem.destroy({
	  	where: {
	  		id: req.params.tweet_id
	  	}
	  }).then(result => {
	  	res.status(200).send({msg: "Success"});
	  })
}
