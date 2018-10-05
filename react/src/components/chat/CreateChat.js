import React from 'react'
import gql from 'graphql-tag'
import Button from '../../reactLIB/Button'
import Row from '../../reactLIB/Row'
import { graphql, compose } from 'react-apollo'
import { withApollo } from 'react-apollo'
import Input from '../../reactLIB/Input'

class CreateChat extends React.Component {
  state = {
    message: '',
  }

  render() {
    return (
      <div style={{ backgroundColor:'#fff', height:'80px'}}>
          <form onSubmit={this.handleChat}>
            <Row style={{width:'100%', marginTop: 20}}>
              <Input
                label="message"
                onChange={e => this.setState({ message: e.target.value })}
                value={this.state.message}
                s={9}
              />
              <Button
                className="btn btn-small"
                onClick={this.handleNext}
                disabled={!this.state.message}
                type='submit'
                variant='fab' color='primary' style={{marginTop:'20px'}}>
                Send
              </Button>
            </Row>
          </form>
      </div>
    )
  }

  handleChat = async e => {
    e.preventDefault()
    const { message } = this.state
    await this.props.createChatMutation({
      variables: {message} ,
    })
    this.setState({message: ''})
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateChatMutation($message: String!) {
    createChat(data: {message: $message}) {
      id
      message
    }
  }
`

export default compose(
  graphql(CREATE_DRAFT_MUTATION, { name: 'createChatMutation' }),
  withApollo
)(CreateChat)
