import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import NotAuth from "../error/NotAuth";
import Icon from "../../reactLIB/Icon";
import Loading from "../error/Loading";

class UsersPageList extends React.Component {
  state = {
    query: "",
    orderBy: "name_ASC"
  };

  render() {
    if (this.props.usersQueryConnection.error) {
      return <NotAuth />;
    }
    if (this.props.usersQueryConnection.loading) {
      return <Loading />;
    }
    const { edges } = this.props.usersQueryConnection.usersConnection;
    return (
      <>
        {edges &&
          edges.map(user => (
            <div
              className="cursor"
              key={user.node.id}
              onClick={() => this.props.elemClicked(user.node)}
            >
              <h3 className="black">
                <Icon
                  type="material"
                  className="fingerprint"
                />
                ;{user.node.name}
              </h3>
              Email: {user.node.email}
              <br />
              Role: {user.node.role}
            </div>
          ))}
        {this.props.children}
      </>
    );
  }
}

const DRAFTS_QUERY = gql`
  query UsersQueryConnection(
    $after: String
    $orderBy: UserOrderByInput
    $where: UserWhereInput
    $skip: Int
  ) {
    usersConnection(
      after: $after
      orderBy: $orderBy
      where: $where
      first: 5
      skip: $skip
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          role
          email
          name
        }
      }
      aggregate {
        count
      }
    }
  }
`;

export default graphql(DRAFTS_QUERY, {
  name: "usersQueryConnection", // name of the injected prop: this.props.feedQuery...
  fetchPolicy: "network-only",
  options: props => ({
    variables: {
      orderBy: props.orderBy,
      where: {
        name_contains: props.query
      }
    }
  })
})(UsersPageList);
