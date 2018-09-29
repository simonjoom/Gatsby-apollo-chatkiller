import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon' 
import ResendEmailValidation from './ResendEmailValidation'

class EmailValidated extends Component {
  state = {
    interval : 0
  }
  render() {

    const authToken = global.isSSR ||localStorage.getItem(AUTH_TOKEN)

    if(authToken && !this.props.emailvalidated) {
      return (
        <div className='paperOut'>
          <Paper className='paperIn'>
            <Icon>error_outline</Icon>{' '}
              Email not validated.<ResendEmailValidation />
            </Paper>
          </div>
        )
    } else {
      return(null)
    }
  }
}
 

export default  EmailValidated
