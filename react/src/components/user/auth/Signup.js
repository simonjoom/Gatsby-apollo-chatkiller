import React, { Component } from "react";
import { AUTH_TOKEN } from "../../../constants/constants";
import { graphql, compose } from "react-apollo";
import { navigate } from "gatsby";
import gql from "graphql-tag";
import Password from "./Password";
//import Button from '@material-ui/core/Button'
import { withApollo } from "react-apollo";
import ProgressBar from "../../../reactLIB/ProgressBar";
import Card from "../../../reactLIB/Card";
import Button from "../../../reactLIB/Button";
import Input from "../../../reactLIB/Input";

var validator = require("email-validator");

class Signup extends Component {
  state = {
    email: "",
    emailValidation: true,
    inputValidation2: true,
    password: "",
    name: "",
    isPasswordActiveStep: false,
    nameFile: "",
    activeStep: 0,
    maxStep: 3
  };

  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }

  onChange(statePasword) {
    this.setState({
      password: statePasword.password,
      inputValidation2: statePasword.inputValidation2
    });
  }

  validateEmail(email) {
    this.pass = validator.validate(email);
    return this.pass;
  }
  validateName(name) {
    this.pass = name.length > 0;
    return this.pass;
  }
  calculateBuffer() {
    let data = "";
    if (this.state.activeStep === 0) {
      data = this.state.name;
    }
    if (this.state.activeStep === 1) {
      data = this.state.email;
    }
    if (this.state.activeStep === 2) {
      data = this.state.password;
    }
    let maxValue = data.length / 10 > 1 ? 1 : data.length / 10;
    return ((this.state.activeStep + maxValue) * 100) / this.state.maxStep;
  }
  handleNext = () => {
    if (this.state.name) {
      if (this.state.activeStep === 0) {
        this.setState(
          {
            activeStep: this.state.activeStep + 1
          },
          () => {
            this.inputRef.focus();
          }
        );
      }
      if (this.state.activeStep === 1) {
        if (this.state.emailValidation) {
          this.setState(
            {
              activeStep: this.state.activeStep + 1
            },
            () => {
              this.inputRef.focus();
              this.setState({ isPasswordActiveStep: true });
            }
          );
        }
      }
      if (this.state.activeStep === 2) {
        if (this.state.inputValidation2) {
          this.setState(
            {
              activeStep: this.state.activeStep + 1
            },
            () => {
              this._confirm();
            }
          );
        }
      }
    }
  };

  handleKey = data => {
    if (data.charCode === 13 && this.pass) {
      //keyPress enter
      this.handleNext();
    }
  };
  setRef = ref => {
    this.inputRef = ref;
  };
  render() {
    const ButtonNext = ({ index, icon = "navigate_next" }) =>
      this.state.activeStep === index ? (
        <Button
          onClick={this.handleNext}
          type="material"
          icon={icon}
          floating
        />
      ) : null;
    return (
      <div className="paperOut">
        <Card>
          <h4 className="mv3">Sign Up</h4>
          <div className="flex flex-column">
            <ProgressBar
              variant="buffer"
              progress={(this.state.activeStep * 100) / this.state.maxStep}
              valueBuffer={this.calculateBuffer()}
            />
            <br />
            <div className="tac">
              <div
                className={
                  "wrapperAnimate " +
                  (this.state.activeStep === 0 ? "focusField" : "notFocusField")
                }
              >
                <Input
                  id="name"
                  label="Your name"
                  placeholder="Your name"
                  value={this.state.name}
                  success={this.validateName(this.state.name)}
                  setRef={this.setRef}
                  onChange={e => this.setState({ name: e.target.value })}
                  type="text"
                  onKeyPress={this.handleKey}
                  inline
                  buttonIcon={<ButtonNext index={0} />}
                  s={12}
                />
              </div>

              <br />
              {this.state.activeStep >= 1 && (
                <div
                  className={
                    "wrapperAnimate " +
                    (this.state.activeStep === 1
                      ? "focusField"
                      : "notFocusField")
                  }
                >
                  <Input
                    id="email"
                    label="Email"
                    placeholder="Your email address"
                    value={this.state.email}
                    success={this.validateEmail(this.state.email)}
                    onChange={e => this.setState({ email: e.target.value })}
                    setRef={this.setRef}
                    type="email"
                    onKeyPress={this.handleKey}
                    inline
                    buttonIcon={<ButtonNext index={1} />}
                    s={12}
                  />
                </div>
              )}

              <br />
              <br />
              {this.state.activeStep >= 2 && (
                <Password
                  handleNext={this.handleNext.bind(this)}
                  onChange={this.onChange.bind(this)}
                  ButtonNext={ButtonNext}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  _confirm = async () => {
    const { name, email, password, nameFile } = this.state;
    await this.props
      .signupMutation({
        variables: {
          name,
          email,
          password,
          nameFile
        }
      })
      .then(result => {
        const { token, user } = result.data.signup;
        this._saveUserData(token, user);
      })
      .catch(e => {
        if (e.graphQLErrors.length) {
          this.notifyAboutComment(e.graphQLErrors[0].message);
        }
      });
  };

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("userToken", JSON.stringify(user));
    this.props.client.resetStore().then(() => {
      navigate(`/`);
    });
  };
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
    $nameFile: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      nameFile: $nameFile
    ) {
      token
      user {
        name
        id
      }
    }
  }
`;

export default compose(
  withApollo,
  graphql(SIGNUP_MUTATION, { name: "signupMutation" })
)(Signup);
