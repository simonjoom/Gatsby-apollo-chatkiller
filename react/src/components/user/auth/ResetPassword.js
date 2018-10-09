import React, { Component } from "react";
import { AUTH_TOKEN } from "../../../constants/constants";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Password from "./Password";
import Button from "../../../reactLIB/Button";
import Card from "../../../reactLIB/Card";
import Input from "../../../reactLIB/Input";

const queryString = require("query-string");

class ResetPassword extends Component {
  state = {
    password: "",
    password2: "",
    inputValidation2: true,
    resetPasswordToken: ""
  };

  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }

  componentDidMount() {
    let resetPasswordToken = queryString.parse(this.props.location.search)
      .resetPasswordToken;
    if (resetPasswordToken) {
      this.setState({
        resetPasswordToken: resetPasswordToken
      });
    }
  }

  onChange(statePasword) { 
    this.setState({
      password: statePasword.password,
      inputValidation2: statePasword.inputValidation2
    });
  }

  handleNext = () => {
    if (!this.state.inputValidation2) {
      // alert("correct password");
    }
  };

  render() {
    return (
      <div className="paperOut">
        <Card>
          <h4 className="mv3">Reset Password</h4>
          <div className="md-grid">
            <Password
              handleNext={this.handleNext.bind(this)}
              onChange={this.onChange.bind(this)}
              setRef={this.setRef}
            />

            <Input
              s={12}
              value={this.state.password2}
              onChange={e => this.setState({ password2: e.target.value })}
              type="password"
              errormessage="Error: Passwords are differents"
              success={this.state.password === this.state.password2}
              label="Retype your safe password"
            />
          </div>
          <div className="flex mt3">
            <Button onClick={() => this._confirm()}>Ok</Button>
          </div>
        </Card>
      </div>
    );
  }

  _confirm = async () => {
    if (!this.state.inputValidation2) {
      return;
    }
    if (this.state.password !== this.state.password2) {
      this.notifyAboutComment("Error: Passwords are differents");
      return;
    }
    const { password, resetPasswordToken } = this.state;
    await this.props
      .resetPasswordMutation({
        variables: {
          resetPasswordToken,
          password
        }
      })
      .then(result => {
        this.notifyAboutComment("Your password has been reset successfully!");
        const { token, user } = result.data.resetPassword;
        this._saveUserData(token, user);
      })
      .catch(e => {
        this.notifyAboutComment(e.graphQLErrors[0].message);
      });
  };

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("userToken", JSON.stringify(user));
  };
}

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation(
    $password: String!
    $resetPasswordToken: String!
  ) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
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
  graphql(RESET_PASSWORD_MUTATION, { name: "resetPasswordMutation" })
)(ResetPassword);
