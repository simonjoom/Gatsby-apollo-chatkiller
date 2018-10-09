import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import NotAuth from '../error/NotAuth'
import Card from "../../reactLIB/Card"; 
import { withApollo } from 'react-apollo'
import UserPageForm from './UserPageForm'
import { AUTH_TOKEN } from '../../constants/constants'

class UserPageCreate extends React.Component {
  state = {
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      nameFile: '',
    }
  }

  updateUserData(user) {
    this.setState({user})
    // this.forceUpdate()
  }

  render() {
    const authToken = global.isSSR ||localStorage.getItem(AUTH_TOKEN)

    if(!authToken) {
      return (<NotAuth/>)
    }

    return ( 
        <div className='paperOut'>
          <Card className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1 className='f3 black-80 fw4 lh-solid'>
                { this.state.user.name}
              </h1>
            </div>

            <UserPageForm
              updateUserData={this.updateUserData.bind(this)}
              user={this.state.user}
            />

              <div>
                <a
                  className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
                  onClick={() => this.createUser()}
                >
                  Save
                </a>

                </div>

          </Card>
        </div> 
    )
  }

  createUser = () => {
    const { name, email, role, nameFile } = this.state.user
    this.props.createUser({
      variables: {
        data: {
          name: name,
          email: email,
          role: role,
          nameFile: nameFile,
          validateEmailToken: '',
          password: '',
          resetPasswordToken: '',
        },
      }
    })
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      role
      nameFile
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, {
    name: 'createUser',
  }), 
  withApollo
)(UserPageCreate)
