import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Card from '../../../reactLIB/Card'
import { withApollo } from 'react-apollo'

const queryString = require('query-string')

class ValidateEmail extends Component {
  state = {
    email: '',
    validateEmailToken: '',
  }

  componentDidMount() {
    let validateEmailToken = queryString.parse(this.props.location.search).validateEmailToken
    if(validateEmailToken) {
      this.validateEmailMutation(validateEmailToken)
    }
  }

  render() {
    return (
      <div className='paperOut'>
        <Card className='paperIn' s={12}>
        <h4 className='mv3'>
          Email Validation
        </h4>
        <div className='flex flex-column'>

        </div>

        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Card>
      </div>
    )
  }
  validateEmailMutation = async (validateEmailToken) => {
    let messageSnackBar
    await this.props.validateEmailMutation({
      variables: {
        validateEmailToken
      },
    })
    .then((result) => {
      const { token, user } = result.data.validateEmail
      this._saveUserData(token, user)
      messageSnackBar = `${user.name}, your email is now validated.`
    })
    .catch((e) => { messageSnackBar = e.graphQLErrors[0].message })
    this.child._openSnackBar(messageSnackBar)
  }

  _saveUserData = () => {
    this.props.client.resetStore().then( ()=> {
    })
  }
}

const VALIDATE_EMAIL_TOKEN_MUTATION = gql`
  mutation ValidateEmailMutation($validateEmailToken: String!) {
    validateEmail(validateEmailToken: $validateEmailToken) {
      token
      user {
        name
        emailvalidated
        id
      }
    }
  }
`

export default compose(
  graphql(VALIDATE_EMAIL_TOKEN_MUTATION, { name: 'validateEmailMutation' }),
  withApollo
)(ValidateEmail)
