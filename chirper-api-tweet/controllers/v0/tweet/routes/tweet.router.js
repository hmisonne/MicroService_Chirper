const models = require('../models')



exports.submit_tweet = async(req, res, next) => {	
  try {
    const tweet = await models.TweetItems.create({
      text: req.body.text,
      author: req.body.author,
      replyingTo: req.body.replyingTo
    })
    return res.status(201).send({success: true, tweet})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
  
}

exports.show_tweets = async(req, res, next) => {
  try {
    const tweets = await models.TweetItems.findAll()
    return res.status(200).send({success: true, tweets})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
  
}


exports.show_tweet = async(req, res, next) => {
  try {
    const tweet = await models.TweetItems.findOne({
      where: {
        id: req.params.tweet_id
      }
    })
    return res.status(200).send({success: true, tweet})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
  
}


exports.edit_tweet = async(req, res, next) => {
	 try {
    await models.TweetItems.update({
      text: req.body.tweet_text
      }, {
      where: {
        id: req.params.tweet_id
      }
    })
    return res.status(200).send({success: true})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

exports.delete_tweet = async(req, res, next) => {
	try {
    await models.TweetItems.destroy({
      where: {
        id: req.params.tweet_id
      }
    })
    return res.status(200).send({success: true})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}