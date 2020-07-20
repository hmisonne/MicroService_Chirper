import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweets, handleReplyToTweet} from '../actions/tweets'
import { Redirect } from 'react-router-dom'
import NewTweetText from './NewTweetText'

class NewTweet extends Component {
  state = {
    toHome: false,
  }

  handleSubmit = (text) => {
    const {dispatch, id } = this.props
    const {toHome} = this.state
    const token = localStorage.getItem('idToken')
    id ? dispatch(handleReplyToTweet(text, id, token))
    : dispatch(handleAddTweets(text, token))
    this.setState(()=>({
      toHome: id ? false : true
    }))
  }
	render() {
    const { toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    
    return (
      <div>

        <h3 className='center'>Compose new Tweet</h3>
        <NewTweetText handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}


export default connect()(NewTweet)