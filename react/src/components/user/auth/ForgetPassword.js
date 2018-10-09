import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Button from "../../../reactLIB/Button";
var validator = require("email-validator");

class ForgetPassword extends Component {
  state = {
    email: ""
  };
  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }
  validateEmail(email) {
    this.pass = validator.validate(email);
    return this.pass;
  }

  render() {
    return (
      <div className="paperOut">
        <Card className="paperIn" s={12}>
          <h4 className="mv3">Forget Password</h4>
          <div className="md-grid">
            <Input
              value={this.state.email}
              success={this.validateEmail(this.state.email)}
              type="email"
              onChange={e => this.setState({ email: e.target.value })}
              label="Your email address"
              s={12}
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
    const { email } = this.state;
    let messageSnackBar;
    await this.props
      .forgetPasswordMutation({
        variables: {
          email
        }
      })
      .then(result => {
        messageSnackBar = `A mail has been sent with a link available until
        ${new Date(
          result.data.forgetPassword.resetPasswordExpires
        ).toLocaleString()}`;
        this.notifyAboutComment(messageSnackBar);
      })
      .catch(e => {
        this.notifyAboutComment(e.graphQLErrors[0].message);
      });
  };
}

const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPasswordMutation($email: String!) {
    forgetPassword(email: $email) {
      name
      id
      resetPasswordExpires
    }
  }
`;

export default compose(
  graphql(FORGET_PASSWORD_MUTATION, { name: "forgetPasswordMutation" })
)(ForgetPassword);
