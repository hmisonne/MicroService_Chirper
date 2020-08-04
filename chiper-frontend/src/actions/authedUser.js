export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (result) {
	return {
		type: SET_AUTHED_USER,
		authedUser: result.user,
	}
}