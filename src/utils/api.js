import {
  _getUsers,
  _saveLikeToggle,
  _saveTweet,
  _removeTweet,
} from './_DATA.js'

import { apiEndpoint } from '../config'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweetsv2(),
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

export async function _getTweetsv2 () {
  console.log('Fetching tweets')
  const response = await fetch(`${apiEndpoint}/`,{
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const tweetList = await response.json()
  let tweetObject = {}
  for (const tweet of tweetList){
    tweetObject[tweet.id] = tweet
  }
  return tweetObject
  
}