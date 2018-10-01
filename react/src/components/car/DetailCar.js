import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { navigate } from "gatsby";
import gql from "graphql-tag";
import { getIdfromRegexPath } from "../../utils";
import Paper from "@material-ui/core/Paper";
import NotFound from "../error/NotFound";
import Button from "../../reactLIB/Button";
import Icon from "../../reactLIB/Icon";
import Loading from "../error/Loading";
import { SideBarContext } from "../SideBarContext";

class DetailPage extends React.Component {
  render() {
    if (this.props.carQuery.loading) {
      return <Loading />;
    }
    const { car } = this.props.carQuery;
    if (!car) {
      return <NotFound />;
    }

    return (
      <SideBarContext.Consumer>
        {context => (
          <div className="paperOut">
            <Paper className="paperIn">
              <h1 className="f3 black-80 fw4 lh-solid">{car.name}</h1>
              <p className="black-80 fw3">{car.text}</p>
              {this._renderAction(car, context)}
            </Paper>
          </div>
        )}
      </SideBarContext.Consumer>
    );
  }

  _renderAction({ id }, context) {
    return (
      <Button
        disabled={context.Me.role !== "ADMIN"}
        onClick={() => this.deleteCar(id)}
      >
        {context.Me.role !== "ADMIN" ? (
          <p>Must be an admin to delete</p>
        ) : (
          <div>
            <Icon>arrow_back</Icon> Delete
          </div>
        )}
      </Button>
    );
  }

  deleteCar = async id => {
    await this.props.deleteCar({
      variables: {
        where: {
          id: id
        }
      }
    });
    this.props.client.resetStore().then(() => {
      navigate("/cars");
    });
  };
}

const POST_QUERY = gql`
  query CarQuery($where: CarWhereUniqueInput!) {
    car(where: $where) {
      id
      name
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteCar($where: CarWhereUniqueInput!) {
    deleteCar(where: $where) {
      id
    }
  }
`;

export default compose(
  graphql(POST_QUERY, {
    name: "carQuery",
    options: props => {
      console.log(props);
      const pathname = props.location.pathname;
      const matchPath = props.pathContext.matchPath;
      const id = getIdfromRegexPath(pathname, matchPath);
      console.log("carQuery",id);
      return {
        fetchPolicy: "network-only",
        variables: {
          where: {
            id
          }
        }
      };
    }
  }),
  graphql(DELETE_MUTATION, { name: "deleteCar" }),
  withApollo
)(DetailPage);
