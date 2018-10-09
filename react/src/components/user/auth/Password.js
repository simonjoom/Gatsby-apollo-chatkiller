import React, { Component } from 'react'
import Button from '../../../reactLIB/Button'
import Input from '../../../reactLIB/Input'

export default class Password extends Component {
  state = {
    inputValidation2: true,
    isPasswordLongEnough: true,
    hasLowerCase: true,
    hasUpperCase: true,
   // hasNumber: true,
   // hasSpecialChar: true,
    password: '',
    passwordMinimumLength: 8
  }
  UNSAFE_componentWillReceiveProps() {
    // this.input2.focus()
  }
  onChange2(e){
    let inputValidation2 = false
    if(
      this.isPasswordLongEnough(e.target.value) &&
      this.hasLowerCase(e.target.value) &&
      this.hasUpperCase(e.target.value)
    //  this.hasNumber(e.target.value) &&
    //  this.hasSpecialChar(e.target.value)
    ) {
      inputValidation2 = true
    }

    this.setState({
      password: e.target.value,
      inputValidation2:inputValidation2,
    //  hasNumber: this.hasNumber(e.target.value),
    //  hasSpecialChar: this.hasSpecialChar(e.target.value),
      hasUpperCase: this.hasUpperCase(e.target.value),
      hasLowerCase: this.hasLowerCase(e.target.value),
      isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
    }, () => {
      this.props.onChange2(this.state)
    })
  }

  hasLowerCase(str) {
     return str.toUpperCase() !== str
  }
  hasUpperCase(str) {
     return str.toLowerCase() !== str
  }
  hasNumber(string) {
    return /\d/.test(string)
  }

  hasSpecialChar(str) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    if(format.test(str)){
      return true
    } else {
      return false
    }
  }

  isPasswordLongEnough(password) {
    if(password.length > this.state.passwordMinimumLength) {
      this.setState({isPasswordLongEnough: true})
      return true
    }
    this.setState({isPasswordLongEnough: false})
    return false
  }

  handleNext = () => {
    this.props.handleNext()
  };

  handleKey = (data) => {
    if(data.charCode === 13) { //keyPress enter
      this.handleNext()
    }
  }

  render() {
    return (
        <div>
        <Input
          id='password'
          label="Choose a safe password"
          value={this.props.password}
          error={!this.state.inputValidation2}
          onChange={this.onChange2.bind(this)}
          type='password'
          inputRef={node => this.input2 = node}
          onKeyPress={this.handleKey}
        />
        {this.props.activeStep && (
            <Button 
            onClick={this.handleNext}
            type="material-icons"
            icon='done'
            floating
          >
          </Button>
        )}
      {!this.state.isPasswordLongEnough && (
        <p>At least {this.state.passwordMinimumLength} characters long.</p>
      )}
      {!this.state.hasLowerCase && (
        <p>At least a lower case letter.</p>
      )}
      {!this.state.hasUpperCase && (
        <p>At least an upper case letter.</p>
      )}
    </div>
    )
  }
}
/*
    
      {!this.state.hasNumber && (
        <FormHelperText>At least an number.</FormHelperText>
      )} {!this.state.hasSpecialChar && (
        <FormHelperText>At least a spceial character.</FormHelperText>
      )}*/