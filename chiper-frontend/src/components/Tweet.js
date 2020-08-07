import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline, TiTrash, TiPencil} from 'react-icons/ti/index'
import { handleToggleTweets, handleDeleteTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {
	handleLike = (e) => {
		e.preventDefault()

		const {dispatch, authedUser, tweet} = this.props

		dispatch(handleToggleTweets({
			id: tweet.id,
			hasLiked: tweet.hasLiked,
			authedUser: authedUser.userId, 
		}))
	}
  toUpdate = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/update/${id}`)
  }
  handleDelete = (e) => {
    e.preventDefault()
    const {dispatch, tweet} = this.props
    dispatch(handleDeleteTweet(tweet))
  }
	toParent = (e, id) => {
		e.preventDefault()
		this.props.history.push(`/tweet/${id}`)
	}
	render() {
		const {tweet, authedUser} = this.props

		if (tweet === null){
			return(<p>This tweet does not exist</p>)
		}
		const {
      author_name, author_avatar, timestamp, text, hasLiked, likes, replies, parent, id, author_id
    } = tweet

    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img
          src={author_avatar}
          alt={`Avatar of ${author_name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{author_name}</span>
            <div>{formatDate(timestamp)}</div>
            {/* {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )} */}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>}
            </button>
            <span>{likes !== 0 && likes}</span>
            {authedUser.userId === author_id && 
              <div>
              <button className='trash-button' onClick={this.handleDelete}>
                <TiTrash className='tweet-icon' />
              </button>
              <button className='update-button' onClick={(e) => this.toUpdate(e, id)}>
                <TiPencil className='tweet-icon' />
              </button>
              </div>
              }
            
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps({authedUser, users, tweets}, {id}){
	const tweet = tweets[id]
	const parentTweet = tweet ? tweets[tweet.replyingTo] : null
	return {
		authedUser,
		tweet: tweet 
			? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
			:  null
	}
}

export default withRouter(connect(mapStateToProps)(Tweet))