import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
  _removeTweet,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweets(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}

export function saveTweet (info) {
  return _saveTweet(info)
}

export function removeTweet (tweet) {
  return _removeTweet(tweet)
}