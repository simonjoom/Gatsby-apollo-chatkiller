import React, { Component } from "react";
import { AUTH_TOKEN } from "../../../constants/constants";
import { graphql, compose, withApollo } from "react-apollo";
import { navigate } from "gatsby";
import gql from "graphql-tag";
import Button from "../../../reactLIB/Button";
import Card from "../../../reactLIB/Card";
import Input from "../../../reactLIB/Input";
var validator = require("email-validator");

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: "",
      name: "",
      loading: false
    };
  }

  validateEmail = email => {
    this.pass = validator.validate(email);
    return this.pass;
  };
  validatePassword = () => {
    console.log("validatePassword", !!this.state.password);
    return !!this.state.password;
  };

  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }

  render() {
    return (
      <div className="paperOut">
        <Card>
          <h4 className="mv3">Login</h4>
          <form className="md-grid" style={{ width: "100%", marginTop: 20 }}>
            <Input
              id="email"
              label="Email"
              placeholder="Your email address"
              type="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              validate
              success={this.validateEmail(this.state.email)}
              required
              s={12}
            />
            <Input
              id="password"
              label="Password"
              placeholder="Your Password"
              type="password"
              name="password"
              value={this.state.password}
              autocomplete="off"
              onChange={e => {
                console.log(e.target);
                this.setState({ password: e.target.value });
              }} 
              success={this.validatePassword()}
              required
              s={12}
            />
          </form>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              className="btn btn-small"
              id="ok"
              onClick={() => this._confirm()}
              style={{ margin: "5%" }}
            >
              Signin
            </Button>

            <Button
              className="btn btn-small"
              onClick={() => navigate("/z/signup")}
              style={{ margin: "5%" }}
            >
              signup
            </Button>
          </div>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              className="btn btn-small"
              onClick={() => navigate("/z/forgetPassword")}
              style={{ margin: "2%" }}
            >
              Forgot Password
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  _confirm = async () => {
    const { email, password } = this.state;

    await this.props
      .loginMutation({
        variables: {
          email,
          password
        }
      })
      .then(result => {
        const { token, user } = result.data.login;
        this._saveUserData(token, user);
        // this.props.history.push(`/`)
        // window.location.reload()
      })
      .catch(e => {
        this.notifyAboutComment(e.graphQLErrors[0].message);
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

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  graphql(LOGIN_MUTATION, { name: "loginMutation" })
)(Login);
