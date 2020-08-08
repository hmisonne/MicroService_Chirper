import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props
    console.log(replies)
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((comment) => (
            <li key={comment.id}>
              <div>{comment.text}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
	const { id } = props.match.params
  console.log(tweets[id].comments)
  return {
    id,
    replies: !tweets[id] || !tweets[id].comments
      ? []
      : tweets[id].comments.sort((a,b) => b.createdAt - a.createdAt)
  }
}

export default connect(mapStateToProps)(TweetPage) 