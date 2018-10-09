import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Card from '../../../reactLIB/Card'
import Button from '../../../reactLIB/Button'
import Input from '../../../reactLIB/Input'
import Row from '../../../reactLIB/Row'

class ForgetPassword extends Component {
  state = {
    email: '',
  }

  render() {
    return (
      <div className='paperOut'>
        <Card className='paperIn' s={12}>
        <h4 className='mv3'>
          Forget Password
        </h4>
        <div className='flex flex-column'>

          <Input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            label='Your email address'
            s={12}
          />

        </div>
        <div className='flex mt3'>
          <Button 
            variant='raised' 
            onClick={() => this._confirm()}
          >
            Ok
          </Button>
        </div>
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Card>
      </div>
    )
  }

  _confirm = async () => {
    const { email } = this.state
      let messageSnackBar
      await this.props.forgetPasswordMutation({
        variables: {
          email
        },
      })
      .then((result) => {
        messageSnackBar = `A mail has been sent with a link available until
        ${new Date(result.data.forgetPassword.resetPasswordExpires).toLocaleString()}`
      })
      .catch((e) => { messageSnackBar = e.graphQLErrors[0].message })
      this.child._openSnackBar(messageSnackBar)
  }
}

const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPasswordMutation($email: String!) {
    forgetPassword(email: $email) {
      name
      id
      resetPasswordExpires
    }
  }
`

export default compose(
  graphql(FORGET_PASSWORD_MUTATION, { name: 'forgetPasswordMutation' }),
)(ForgetPassword)
