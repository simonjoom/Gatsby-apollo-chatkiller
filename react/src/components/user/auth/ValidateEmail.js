import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Card from "../../../reactLIB/Card";
import { withApollo } from "react-apollo";

const queryString = require("query-string");

class ValidateEmail extends Component {
  state = {
    email: "",
    validateEmailToken: ""
  };

  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }
  
  componentDidMount() {
    let validateEmailToken = queryString.parse(this.props.location.search)
      .validateEmailToken;
    if (validateEmailToken) {
      this.validateEmailMutation(validateEmailToken);
    }
  }

  render() {
    return (
      <div className="paperOut">
        <Card className="paperIn">
          <h4 className="mv3">Email Validation</h4>
          <div className="flex flex-column" />
        </Card>
      </div>
    );
  }
  validateEmailMutation = async validateEmailToken => {
    await this.props
      .validateEmailMutation({
        variables: {
          validateEmailToken
        }
      })
      .then(result => {
        const { token, user } = result.data.validateEmail;
        this.notifyAboutComment(`${user.name}, your email is now validated.`);

        this._saveUserData(token, user);
      })
      .catch(e => {
        this.notifyAboutComment(e.graphQLErrors[0].message);
      });
  };

  _saveUserData = () => {
    this.props.client.resetStore().then(() => {});
  };
}

const VALIDATE_EMAIL_TOKEN_MUTATION = gql`
  mutation ValidateEmailMutation($validateEmailToken: String!) {
    validateEmail(validateEmailToken: $validateEmailToken) {
      token
      user {
        name
        emailvalidated
        id
      }
    }
  }
`;

export default compose(
  graphql(VALIDATE_EMAIL_TOKEN_MUTATION, { name: "validateEmailMutation" }),
  withApollo
)(ValidateEmail);
