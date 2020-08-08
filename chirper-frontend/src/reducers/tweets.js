import { 
	RECEIVE_TWEETS,
	TOGGLE_TWEET,
	ADD_TWEET,
	UPDATE_TWEET_TEXT,
	DELETE_TWEET,
	ADD_COMMENT
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
			return {
				...state, 
				[tweet.id]: tweet,
			}
		case ADD_COMMENT:
			const {comment} = action
			return {
				...state, 
				[comment.tweetId]: {
					...state[comment.tweetId],
					comments: state[comment.tweetId].comments.concat([action.comment])
				},
			}
		case DELETE_TWEET:
			return omit(state, action.tweet.id)
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