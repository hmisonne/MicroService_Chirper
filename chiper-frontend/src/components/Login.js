import React, { Component } from 'react'
import Auth from '../auth/Auth'
import { Button } from 'semantic-ui-react'


export class LogIn extends Component {
  onLogin = () => {
    this.props.auth.login()
  }

  render() {
    return (
      <div>
        <h1>Please log in</h1>

        <Button onClick={this.onLogin} size="huge" color="olive">
          Log in
        </Button>
      </div>
    )
  }
}
