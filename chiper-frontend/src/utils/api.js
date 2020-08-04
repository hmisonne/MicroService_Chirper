import {
  _getUsers,
  _saveLikeToggle,
  _saveTweet
} from './_DATA.js'

import { apiEndpoint } from '../config'

export function getInitialData (token) {
  return Promise.all([
    _getUsers(),
    _getTweets(),
    _getAuthedUser(token),
  ]).then(([users, tweets, authedId]) => ({
    users,
    tweets,
    authedId
  }))
}

export async function _getAuthedUser(token) {
  return new Promise((res, rej) => {
    setTimeout(() => res({authedId: 'tylermcginnis'}), 1000)
  })
}

export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}


export async function saveTweet (info, token) {
  return fetch(`${apiEndpoint}/`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    body: JSON.stringify(info),
  })
}

export async function modifyTweet (info) {
  console.log('info', info)
  return fetch(`${apiEndpoint}/${info.id}`,{
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: info.text}),
  })
}

export async function replyToTweet (info) {
  console.log('info', info)
  return fetch(`${apiEndpoint}/${info.replyingTo}/comment`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: info.text, author: info.author}),
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
  for (const tweet of tweetList.tweets){
    tweetObject[tweet.id] = tweet
  }
  return tweetObject
  
}