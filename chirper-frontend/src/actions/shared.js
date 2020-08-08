import { getInitialData} from '../utils/api';
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData (token) {
	return dispatch => {
		dispatch(showLoading())
		return getInitialData(token)
			.then(({users,tweets, authedUser})=>{
				dispatch(receiveUsers(users))
				dispatch(receiveTweets(tweets))
				dispatch(setAuthedUser(authedUser))
				dispatch(hideLoading())
			})
	}
}
