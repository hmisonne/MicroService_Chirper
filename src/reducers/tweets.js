import { 
	RECEIVE_TWEETS,
	TOGGLE_TWEET,
	ADD_TWEET,
	UPDATE_TWEET_TEXT,
	DELETE_TWEET 
} from '../actions/tweets'

import { omit } from 'lodash'

export default function tweets (state={}, action) {
	switch (action.type) {
		case RECEIVE_TWEETS:
			return {
				...state,
				...action.tweets
			}
		case TOGGLE_TWEET :
	      return {
	        ...state,
	        [action.id]: {
	          ...state[action.id],
	          likes: action.hasLiked === true
					? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            		: state[action.id].likes.concat([action.authedUser])
				}
			}
		case ADD_TWEET:
			const {tweet} = action

			let replyingTo = {}
			if (tweet.replyingTo !== null) {
				replyingTo = {
					[tweet.replyingTo]: {
						...state[tweet.replyingTo],
						replies: state[tweet.replyingTo].replies.concat([tweet.id])
					}
				}
			}
			return {
				...state, 
				[tweet.id]: tweet,
				...replyingTo,
			}

		case DELETE_TWEET:
			const tweet2 = action.tweet
			let replyingToTweet = {}
			if (tweet2.parent !== null) {
				replyingToTweet = {
					[tweet2.parent.id]: {
						...state[tweet2.parent.id],
						replies: state[tweet2.parent.id].replies.filter(tweetID => tweetID !== tweet2.id)
					}
				}
			}
			const newState = {
				...state,
				...replyingToTweet
			}
			return omit(newState, tweet2.id)
		case UPDATE_TWEET_TEXT:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					text: action.text
				}
			}

		default:
			return state
	}
}