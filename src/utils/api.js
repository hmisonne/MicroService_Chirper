import {
  _getUsers,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

import { apiEndpoint } from '../config'

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


export async function saveTweet (info) {
  return fetch(`${apiEndpoint}/`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info),
  })
}

export async function removeTweet (tweet_id) {
  fetch(`${apiEndpoint}/${tweet_id}`,{
    method: 'Delete',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export async function _getTweets () {
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