import React from 'react'
import Paper from '@material-ui/core/Paper'
import { navigate } from "gatsby"; 
import TextField from '@material-ui/core/TextField'
import UsersPageList from './UsersPageList' 

class UsersPage extends React.Component {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  elemClicked(elem) {
    navigate('/user/' + elem.id)
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          <div className='flex justify-between items-center'>
            <h1>Users</h1>
          </div>
          <TextField onChange={e => this.setState({query: e.target.value})} value={this.state.query} type='text' label='Search'/>
          <UsersPageList showWhenQueryEmpty={true} query={this.state.query} showTitle={true} showMore={true} elemClicked={this.elemClicked.bind(this)} orderBy={this.state.orderBy}/>
        </Paper>
      </div>
      )
  }
}

export default UsersPage
