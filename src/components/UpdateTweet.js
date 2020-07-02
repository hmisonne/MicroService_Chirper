import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'
import NewTweetText from './NewTweetText'

class UpdateTweet extends Component {
  state = {
    toHome: false,
  }
  handleSubmit = (text) => {
    const {dispatch, tweet } = this.props

    dispatch(updateTweet({text, id: tweet.id}))
    this.setState(()=>({
      toHome: true
    }))
  }
	render() {
    const {toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3 className='center'>Update Tweet</h3>
        <NewTweetText handleSubmit={this.handleSubmit} tweet={this.props.tweet}/>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, tweets}, props) {
  console.log('params', props)
  const { id } = props.match.params
  return {
    tweet: tweets[id]
  }
}

export default connect(mapStateToProps)(UpdateTweet)