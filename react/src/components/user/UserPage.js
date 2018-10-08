import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "gatsby";
import Post from "../../components/post/Post";
import NotAuth from "../error/NotAuth";
import { getIdfromRegexPath } from "../../utils";
import { AUTH_TOKEN } from "../../constants/constants";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import NotFound from "../error/NotFound";
import Tooltip from "@material-ui/core/Tooltip";
import UploadFile from "../nav/UploadFile";
import { withApollo } from "react-apollo";
import Loading from "../error/Loading";
import UserPageForm from "./UserPageForm";
import Col from "../../reactLIB/Col"

class UserPage extends React.Component {
  state = {
    open: false,
    isEditMode: false
  };

  isUserMyself = () => {
    if (!global.isSSR) {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      return userToken.id === this.props.userQuery.user.id;
    }
  };

  updateUserData(user) {
    this.props.userQuery.user = user;
    this.forceUpdate();
  }

  render() {
    if (this.props.userQuery.error) {
      return <NotAuth />;
    }

    const { user } = this.props.userQuery;
    if (!user) {
      return <NotFound />;
    }

    if (this.props.userQuery.loading) {
      return <Loading />;
    }

    const authToken = global.isSSR || localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="paperOut">
        <div className="paperIn">
          <div className="flex justify-between items-center">
            <h1 className="f3 black-80 fw4 lh-solid">
              {this.props.userQuery.user.name}{" "}
              <Icon
                onClick={() =>
                  this.setState({ isEditMode: !this.state.isEditMode })
                }
                className="edit"
              >
                border_color
              </Icon>
            </h1>
            {this.isUserMyself() && (
              <Tooltip title="Change your password">
                <Icon onClick={() => navigate("/updatePassword")}>
                  security
                </Icon>
              </Tooltip>
            )}
          </div>

          {this.state.isEditMode && (
            <UserPageForm
              updateUserData={this.updateUserData.bind(this)}
              user={this.props.userQuery.user}
            />
          )}

          {!this.state.isEditMode && (
            <div>
              <p className="black-80 fw3">
                Role: {this.props.userQuery.user.role}
              </p>
              <UploadFile
                isEditMode={false}
                nameFile={this.props.userQuery.user.nameFile}
              />
            </div>
          )}
          <div>
            {this.state.isEditMode && (
              <div>
                <a
                  className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                  onClick={() => this.updateUser(this.props.userQuery.user.id)}
                >
                  Save
                </a>{" "}
                {!this.isUserMyself() && (
                  <a
                    className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                    onClick={() => this.deleteUser(this.state.user.id)}
                  >
                    Delete
                  </a>
                )}
              </div>
            )}
          </div>
          {authToken && (
            <div className="f6 ba ph3 pv2 mb2 black">
              <h1>Posts from {this.props.userQuery.user.name}</h1>
              {this.props.userQuery.user.posts &&
                this.props.userQuery.user.posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
            </div>
          )}
          {this.props.children}
        </div>
      </div>
    );
  }

  updateUser = async id => {
    const { name, email, role, nameFile } = this.props.userQuery.user;
    await this.props.updateUser({
      variables: {
        where: { id: id },
        data: { name: name, email: email, role: role, nameFile: nameFile }
      }
    });
    this.setState({ isEditMode: false });
  };

  deleteUser = async id => {
    await this.props.deleteUser({
      variables: { id }
    });
    this.props.client.resetStore().then(() => {
      navigate("/users");
    });
  };
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateUser(data: $data, where: $where) {
      id
      name
      email
      role
      nameFile
    }
  }
`;

const USER_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      name
      nameFile
      posts {
        id
        title
        text
        nameFile
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, {
    name: "userQuery",
    options: props => {
      const pathname = props.location.pathname;
      const matchPath = props.pathContext.matchPath;
      const id = getIdfromRegexPath(pathname, matchPath);
      return {
        variables: {
          where: {
            id
          }
        }
      };
    }
  }),
  graphql(UPDATE_USER_MUTATION, {
    name: "updateUser"
  }),
  graphql(DELETE_MUTATION, {
    name: "deleteUser"
  }),
  withApollo
)(UserPage);
