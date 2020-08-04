import React, { Component, Fragment } from 'react'
import { Link, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import NewTweet from './NewTweet'
import { NotFound } from './NotFound'
import LoadingBar from 'react-redux-loading'
import TweetPage from './TweetPage'
import UpdateTweet from './UpdateTweet'
import Nav from './Nav'
import { LogIn } from './Login'


class App extends Component {
	constructor(props) {
	    super(props)

	    this.handleLogin = this.handleLogin.bind(this)
	    this.handleLogout = this.handleLogout.bind(this)
	  }

	handleLogin() {
		this.props.auth.login()
	}

	handleLogout() {
		this.props.auth.logout()
	}
	render() {
		return (
			<Router history={this.props.history}>
				{this.generateMenu()}

                {this.generateCurrentPage()}

				
		  </Router>
		)
	}

	generateMenu() {
	    return (
	      <Menu>
	        <Menu.Item name="home">
	          <Link to="/">Home</Link>
	        </Menu.Item>
	        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
	      </Menu>
	    )
	  }
	logInLogOutButton() {
	    if (this.props.auth.isAuthenticated()) {
	      return (
	        <Menu.Item name="logout" onClick={this.handleLogout}>
	          Log Out
	        </Menu.Item>
	      )
	    } else {
	      return (
	        <Menu.Item name="login" onClick={this.handleLogin}>
	          Log In
	        </Menu.Item>
	      )
	    }
	}
    generateCurrentPage() {
	    if (!this.props.auth.isAuthenticated()) {
	      return (<LogIn auth={this.props.auth} />)
    	}
	this.props.dispatch(handleInitialData())
    return (
    	<Fragment>
			<LoadingBar />
			  <div className='container'>
			  
			  <Nav />
			  {this.props.loading === true 
			  	? null
			  	: 
			  	<div>
					<Switch>
						<Route
						  path="/"
						  exact
				          render={props => {
				            return <Dashboard {...props} auth={this.props.auth} />
				          }}
				        />
				 		<Route
						  path="/callback"
						  exact
				          render={props => {
				            return <Dashboard {...props} auth={this.props.auth} />
				          }}
				        />
				        <Route
				          path="/new"
				          exact
				          render={props => {
				            return <NewTweet {...props} auth={this.props.auth} />
				          }}
				        />
				        <Route
				          path="/tweet/:id"
				          exact
				          render={props => {
				            return <TweetPage {...props} auth={this.props.auth} />
				          }}
				        />
				        <Route
				          path="/update/:id"
				          exact
				          render={props => {
				            return <UpdateTweet {...props} auth={this.props.auth} />
				          }}
				        />
				        

				        <Route component={NotFound} />
					</Switch>
			  	</div>
			  	
				   }
			  </div>
		</Fragment>
    )
  }
}

function mapStateToProps ({authedUser}) {
	return {
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)



