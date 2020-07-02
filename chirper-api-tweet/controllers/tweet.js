

exports.get_tweets = function(req, res, next) {
  res.render('tweet', { title: 'Express' });
}