import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose, withApollo } from 'react-apollo' 
import { navigate } from "gatsby"; 
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Button from '../../../reactLIB/Button'
import Card from "../../../reactLIB/Card"

import Input from '../../../reactLIB/Input'
import Row from '../../../reactLIB/Row'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    name: '',
  }

  render() {
    return (
      <div className='paperOut'>
        <Card className='paperIn'>
        <h4 className='mv3'>
          Login
        </h4>
        <div className='flex flex-column'>

          {/* <TextField
            id='email'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            label='Your email address'
          />
          <TextField
            id='password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            label='Password'
          /> */}
          <Row style={{width:'100%', marginTop: 20}}>
            <Input
              id='email'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type='text'
              label='Your email address'
              s={12}
              
            />
            <Input
              id='password'
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              type='password'
              label='Password'
              s={12}
            />
            {/* <Button
              className="btn btn-small"
              onClick={this.handleNext}
              disabled={!this.state.message}
              type='submit'
              variant='fab' color='primary' style={{marginTop:'20px'}}>
              Send
            </Button> */}
          </Row>

        </div>
        <div className='flex' style={{display:"flex", justifyContent: "center"}}>
          <Button
           className="btn btn-small"
           id='ok' 
           variant='raised' 
           onClick={() => this._confirm()}
           style={{margin: '5%'}}
           >
            Signin
          </Button>

          <Button 
            className="btn btn-small"
            variant='flat'
            onClick={() => navigate('/signup')}
            style={{margin: '5%'}}
          >signup
          </Button>
        </div>
        <div className="flex" style={{display:"flex", justifyContent: "center"}}>
        <Button 
            className="btn btn-small"
            variant='flat'
            onClick={() => navigate('/forgetPassword')}
            style={{margin: '2%'}}
          >Forgot Password
          </Button>
        </div>
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Card>
      </div>
    )
  }

  _confirm = async () => {
    const { email, password } = this.state

      await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      .then((result) => {
        const { token, user } = result.data.login
        this._saveUserData(token, user)
        // this.props.history.push(`/`)
        // window.location.reload()
      })
      .catch((e) => {
        this.child._openSnackBar(e.graphQLErrors[0].message)
      })
  }

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
    this.props.client.resetStore().then( () => {
     navigate(`/`)
    })
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        id
      }
    }
  }
`

export default compose(
  withApollo,
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login)
