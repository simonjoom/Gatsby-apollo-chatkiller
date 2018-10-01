import React from 'react' 
import gql from 'graphql-tag'
import { navigate } from "gatsby"; 
import Paper from '@material-ui/core/Paper'
import Button from '../../reactLIB/Button'
import { graphql, compose,withApollo } from 'react-apollo' 
import Input from '../../reactLIB/Input'
// import InputLabel from '@material-ui/core/InputLabel'
// import FormControl from '@material-ui/core/FormControl'
import Row from '../../reactLIB/Row'

class CreateCar extends React.Component {
  state = {
    name: '',
  }

  render() { 
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handleCar}>
          <h1>Create Car</h1>
            <Row>
              {/* <InputLabel htmlFor='name'>Name</InputLabel> */}
              <Input
                id='name'
                autoComplete='off'
                autoFocus
                onChange={e => this.setState({ name: e.target.value })}
                type='text'
                value={this.state.name}
                placeholder="Car name"
              />
            </Row>
            {/* <br/> */}
            {/* <br/> */}
          <Button
            className={`pa3 bg-black-10 bn`}
            disabled={!this.state.name}
            type='submit'
            variant='raised' color='primary'>
            Create
          </Button>
          {' '}
          <a className='f6 pointer' onClick={()=>window.history.back()}>
            or cancel
          </a>
        </form>
      </Paper>
      </div>
    )
  }

  handleFile = (nameFile) => {
      this.setState({nameFile: nameFile})
  }

  handleCar = async e => {
    e.preventDefault()
    const { name } = this.state
    await this.props.createCarMutation({
      variables: {name} ,
    })
    this.props.client.resetStore().then( () => {
      navigate('/cars')
    })
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateCarMutation($name: String!) {
    createCar(data: {name: $name}) {
      id
      name
    }
  }
`

export default compose(
  graphql(CREATE_DRAFT_MUTATION, { name: 'createCarMutation' }), 
  withApollo
)(CreateCar)
