import { saveLikeToggle, saveTweet, removeTweet, modifyTweet, replyToTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'
export const DELETE_TWEET = 'DELETE_TWEET'
export const UPDATE_TWEET_TEXT ='UPDATE_TWEET_TEXT'
export const ADD_COMMENT = 'ADD_COMMENT'

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

export function addComment(comment) {
	return {
		type: ADD_COMMENT,
		comment,
	}
}

export function handleDeleteTweet(tweet) {
	return (dispatch) => {
		dispatch(deleteTweet(tweet))
		return removeTweet(tweet.id)
			.catch(e => {
				console.warn('Error in handleDeleteTweet: ',e)
				const token = null
				dispatch(handleAddTweets(tweet.text, token))
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

export function handleReplyToTweet(text, id, token) {
	return (dispatch, getState) => {
		const {authedUser} = getState()

		dispatch(showLoading())
		
		return replyToTweet({
			author: authedUser.userId, 
			text,
			replyingTo: id
		}, token)
		.then((response)=> response.json())
		.then(data => {
			dispatch(addComment(data.comment))
		})
		.then(()=> dispatch(hideLoading()))
	}
}

export function handleAddTweets(text, token) {
	return (dispatch, getState) => {
		const {authedUser} = getState()

		dispatch(showLoading())
		
		return saveTweet({
			author: authedUser.userId, 
			text,
		}, token)
		.then((response)=> response.json())
		.then(data => {
			dispatch(addTweet(data.tweet))
		})
		.then(()=> dispatch(hideLoading()))
	}
}

export function handleAddComments(text, replyingTo, token) {
	return (dispatch, getState) => {
		const {authedUser} = getState()

		dispatch(showLoading())
		
		return replyToTweet({
			author: authedUser.name, 
			text, 
			replyingTo
		}, token)
		.then((response)=> response.json())
		.then(data => {
			dispatch(addComment(data.tweet))
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