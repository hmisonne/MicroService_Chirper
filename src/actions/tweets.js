import { saveLikeToggle, saveTweet, removeTweet, modifyTweet, replyToTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'
export const DELETE_TWEET = 'DELETE_TWEET'
export const UPDATE_TWEET_TEXT ='UPDATE_TWEET_TEXT'

export function receiveTweets(tweets) {
	return {
		type: RECEIVE_TWEETS,
		tweets
	}
}

export function toggleTweets({id, authedUser, hasLiked}) {
	return {
		type: TOGGLE_TWEET,
		id, 
		authedUser,
		hasLiked
	}
}

export function handleToggleTweets(info){
	return (dispatch) => {
		dispatch(toggleTweets(info))
		return saveLikeToggle(info)
			.catch((e) => {
				console.warn('Error in handleToggleTweets: ',e)
				dispatch(toggleTweets(info))
				alert('There was an error liking the tweet. Try again')
			})
	}

}

export function addTweet(tweet) {
	return {
		type: ADD_TWEET,
		tweet,
	}
}

export function handleDeleteTweet(tweet) {
	return (dispatch) => {
		dispatch(deleteTweet(tweet))
		return removeTweet(tweet.id)
			.catch(e => {
				console.warn('Error in handleDeleteTweet: ',e)
				dispatch(handleAddTweets(tweet.text, tweet.replyingTo))
				alert('There was an error deleting the tweet. Try again')
			})
	}
}

export function deleteTweet(tweet) {
	return {
		type: DELETE_TWEET,
		tweet,
	}
}

export function updateTweet({id, text}) {
	return {
		type: UPDATE_TWEET_TEXT,
		text,
		id
	}
}

export function handleAddTweets(text, replyingTo) {
	return (dispatch, getState) => {
		const {authedUser} = getState()

		dispatch(showLoading())
		
		return saveTweet({
			author: authedUser, 
			text, 
			replyingTo
		})
		.then((response)=> response.json())
		.then(data => {
			replyToTweet({
				parentId: replyingTo,
				childId: data.tweet.id,
			})
			dispatch(addTweet(data.tweet))
		})
		.then(()=> dispatch(hideLoading()))
	}
}

export function handleUpdateTweet({id, text}) {
	return (dispatch, getState) => {
		dispatch(showLoading())
		
		return modifyTweet({
			id,
			text
		})
		.then((response)=> response.json())
		.then(data => dispatch(updateTweet({id, text})))
		.then(()=> dispatch(hideLoading()))
	}
}