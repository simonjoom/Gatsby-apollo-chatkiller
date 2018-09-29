import React, { Component } from 'react'
import { Link } from "@reach/router"
import Paper from '@material-ui/core/Paper' 

class NotFound extends Component {
  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          404 Error !!
          <br/>
          <br/>
          <Link to='/'>Home</Link>
        </Paper>
      </div>
    )
  }
}

export default NotFound
