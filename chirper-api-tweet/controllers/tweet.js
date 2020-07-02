

exports.get_tweets = function(req, res, next) {
  res.render('tweet', { title: 'Express' });
}

exports.submit_tweet = function(req, res, next) {
  console.log("tweet text", req.body.tweet_text)
  res.redirect('/')
}