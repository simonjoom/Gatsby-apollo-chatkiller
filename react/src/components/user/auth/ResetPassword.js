import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Card from '../../../reactLIB/Card'
import Button from '../../../reactLIB/Button'
import Input from '../../../reactLIB/Input'

const queryString = require('query-string')

class ResetPassword extends Component {
  state = {
    password: '',
    password2: '',
    resetPasswordToken: '',
  }

  componentDidMount() {
    let resetPasswordToken = queryString.parse(this.props.location.search).resetPasswordToken
    if(resetPasswordToken) {
      this.setState({
        resetPasswordToken: resetPasswordToken
      })
    }
  }

  render() {
    return (
      <div className='paperOut'>
        <Card className='paperIn'>
        <h4 className='mv3'>
          Reset Password
        </h4>
        <div className='flex flex-column'>

          <Input
            value={this.state.password}
            s={12}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            label='Choose a safe password'
          />
          <Input
            s={12}
            value={this.state.password2}
            onChange={e => this.setState({ password2: e.target.value })}
            type='password'
            label='Retype your safe password'
          />

        </div>
        <div className='flex mt3'>
          <Button variant='raised' onClick={() => this._confirm()}>
            Ok
          </Button>

        </div>
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Card>
      </div>
    )
  }

  _confirm = async () => {
    if(this.state.password !== this.state.password2) {
      this.child._openSnackBar('Error: Passwords are differents')
      return
    }
    let messageSnackBar
    const { password, resetPasswordToken } = this.state
    await this.props.resetPasswordMutation({
      variables: {
        resetPasswordToken,
        password
      },
    })
    .then((result) => {
      messageSnackBar = `Your password has been reset successfully!`
      const { token, user } = result.data.resetPassword
      this._saveUserData(token, user)
    })
    .catch((e) => {
      messageSnackBar = e.graphQLErrors[0].message
    })
    this.child._openSnackBar(messageSnackBar)
  }

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
  }
}

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($password: String!, $resetPasswordToken: String!) {
    resetPassword(password: $password, resetPasswordToken: $resetPasswordToken) {
      token
      user {
        name
        id
      }
    }
  }
`

export default compose(
  graphql(RESET_PASSWORD_MUTATION, { name: 'resetPasswordMutation' }),
)(ResetPassword)
