import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import NewTweet from './NewTweet'
import LoadingBar from 'react-redux-loading'
import TweetPage from './TweetPage'
import UpdateTweet from './UpdateTweet'
import Nav from './Nav'

class App extends Component {
	
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					  <div className='container'>
					  
					  <Nav />
					  {this.props.loading === true 
					  	? null
					  	: 
					  	<div>
					  		<Route exact path='/' component={Dashboard}/>
					  		<Route path='/tweet/:id' component={TweetPage}/>
					  		<Route path='/new' component={NewTweet}/>
				  			<Route path='/update/:id' component={UpdateTweet}/>

					  	</div>
					  	
						   }
					  </div>
				</Fragment>
		  </Router>
		)
	}
}

function mapStateToProps ({authedUser}) {
	return {
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)

// <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>}

