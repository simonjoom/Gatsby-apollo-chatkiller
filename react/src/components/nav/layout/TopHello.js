import React, { Component } from "react";
import { AUTH_TOKEN } from "../../../constants/constants";
import { Link } from "@reach/router";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import MenuAvatar from "./MenuAvatar";
import { withApollo } from "react-apollo";

class TopHello extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <>
        {authToken &&
          this.props.me.me && (
            <MenuAvatar
              user={this.props.me.me}
              nameFile={this.props.me.me.nameFile}
            />
          )}
        {!authToken && (
          <Link to="/z/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </>
    );
  }
}

const USER_QUERY = gql`
  query Me {
    me {
      id
      email
      role
      name
      nameFile
    }
  }
`;

export default compose(
  graphql(USER_QUERY, { name: "me" }),
  withApollo
)(TopHello);
