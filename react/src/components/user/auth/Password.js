import React, { Component } from "react";
import Input from "../../../reactLIB/Input";
import Button from "../../../reactLIB/Button";

export default class Password extends Component {
  state = {
    inputValidation2: false,
    isPasswordLongEnough: true,
    hasLowerCase: true,
    hasUpperCase: true,
    showPassword: false,
    // hasNumber: true,
    // hasSpecialChar: true,
    password: "",
    passwordMinimumLength: 8
  };

  UNSAFE_componentWillReceiveProps() {
    if (!this.state.inputValidation2) this.inputRef.focus();
  }
  onChange(e) {
    let inputValidation2 = false;
    if (
      this.isPasswordLongEnough(e.target.value) &&
      this.hasLowerCase(e.target.value) &&
      this.hasUpperCase(e.target.value)
      //  this.hasNumber(e.target.value) &&
      //  this.hasSpecialChar(e.target.value)
    ) {
      inputValidation2 = true;
    }

    this.setState(
      {
        password: e.target.value,
        inputValidation2: inputValidation2,
        //  hasNumber: this.hasNumber(e.target.value),
        //  hasSpecialChar: this.hasSpecialChar(e.target.value),
        hasUpperCase: this.hasUpperCase(e.target.value),
        hasLowerCase: this.hasLowerCase(e.target.value),
        isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  }

  hasLowerCase(str) {
    return str.toUpperCase() !== str;
  }
  hasUpperCase(str) {
    return str.toLowerCase() !== str;
  }
  hasNumber(string) {
    return /\d/.test(string);
  }

  hasSpecialChar(str) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  isPasswordLongEnough(password) {
    if (password.length > this.state.passwordMinimumLength) {
      this.setState({ isPasswordLongEnough: true });
      return true;
    }
    this.setState({ isPasswordLongEnough: false });
    return false;
  }

  handleNext = () => {
    this.props.handleNext();
  };

  handleKey = data => {
    if (data.charCode === 13) {
      //keyPress enter
      this.handleNext();
    }
  };
  showPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    const ButtonStart = () => (
      <Button
        onClick={() => this.showPassword()}
        type="material"
        icon={this.state.showPassword ? "visibility_off" : "visibility"}
        flat
      />
    );
    const { placeholder, id, label } = this.props;
    const ButtonNext = this.props.ButtonNext
      ? this.props.ButtonNext
      : () => <div />;
    const errormessage = !this.state.isPasswordLongEnough
      ? "At least " + this.state.passwordMinimumLength + " characters long."
      : !this.state.hasLowerCase
        ? "At least a lower case letter."
        : !this.state.hasUpperCase
          ? "At least an upper case letter."
          : "";
    return (
      <div className="wrapperAnimate focusField">
        <Input
          id={id}
          value={this.state.password}
          label={label}
          placeholder={placeholder}
          errormessage={errormessage}
          success={this.state.inputValidation2}
          onChange={this.onChange.bind(this)}
          type={this.state.showPassword ? "text" : "password"}
          setRef={ref => {
            this.inputRef = ref;
            this.props.setRef && this.props.setRef(ref);
          }}
          onKeyPress={this.handleKey}
          inline
          buttonIcon={<ButtonNext icon={this.props.nextIcon} />}
          buttonIconStart={<ButtonStart />}
          s={12}
        />
      </div>
    );
  }
}

Password.defaultProps = {
  id: "password",
  label: "Password",
  placeholder: "Choose a safe password"
};

/*
    
      {!this.state.hasNumber && (
        <FormHelperText>At least an number.</FormHelperText>
      )} {!this.state.hasSpecialChar && (
        <FormHelperText>At least a spceial character.</FormHelperText>
      )}*/
