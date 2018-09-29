import React, { Component } from 'react' 
import Paper from '@material-ui/core/Paper'
import { Link } from "@reach/router"

class NotAuth extends Component {
  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          Not authentificated!
          <br/>
          <br/>
          <Link to='/login'>Login</Link>
        </Paper>
      </div>
    )
  }
}

export default NotAuth
