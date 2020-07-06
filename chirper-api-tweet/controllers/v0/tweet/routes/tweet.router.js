const models = require('../models')
const createError = require('http-errors');
const sequelize = require('sequelize');

exports.submit_tweet = async(req, res, next) => {	
  try {
    const {text, author, replyingTo} = req.body
    if (!text || !author){
      return next(createError(400, "Missing text and/or author"))
      next()
    }
    const tweet = await models.TweetItems.create({
      text,
      author,
      replyingTo
    })
    return res.status(201).send({success: true, tweet})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
  
}

exports.show_tweets = async(req, res, next) => {
  try {
    const tweets = await models.TweetItems.findAll()
    return res.status(200).send({success: true, tweets})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
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
    return res.status(500).json({success: false, error: error.message})
  }
  
}


exports.edit_tweet = async(req, res, next) => {
	 try {
    const { text, replies } = req.body
    if (!text && !replies){
      return next(createError(400, "Missing text and/or replies"))
      next()
    }
    // Check if tweetId exist
    await models.TweetItems.findOne({
      where: {
        id: req.params.tweet_id
      }
    })
    if (replies) {
      await models.TweetItems.update({
        text: req.body.text,
        replies: sequelize.fn('array_append', sequelize.col('replies'), replies)
        }, {
        where: {
          id: req.params.tweet_id
        }
      })
    } else {
      await models.TweetItems.update({
        text: req.body.text}, {
        where: {
          id: req.params.tweet_id
        }
      })
    }
   
    return res.status(200).send({success: true})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
}

exports.delete_tweet = async(req, res, next) => {
	try {
    // Check if tweetId exist
    await models.TweetItems.findOne({
      where: {
        id: req.params.tweet_id
      }
    })
    await models.TweetItems.destroy({
      where: {
        id: req.params.tweet_id
      }
    })
    return res.status(200).send({success: true})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
}