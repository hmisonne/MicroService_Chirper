import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweetText extends Component {
  state = {
    text:'',
  }
  componentDidMount() {
    const { tweet } = this.props
    console.log(tweet)
    if (tweet !== undefined) {
      this.setState(()=>({
      text: tweet.text
    }))
    }
  }
  handleChange = (e) => {
    const text = e.target.value
    this.setState(()=>({
      text
    }))
  }
  onSubmitTweet = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state.text)
  }
	render() {
    const {text} = this.state
    const tweetLeft = 280 - text.length
    return (
      <div>
        <form className='new-tweet' onSubmit={this.onSubmitTweet}>
          <textarea
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}/>
            {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button  className='btn' disabled={text ===''}>SUBMIT</button>
        </form>
        
      </div>
    )
  }
}


export default NewTweetText