import React from "react";
import { navigate } from "gatsby"
import { graphql, compose } from "react-apollo";
import { getIdfromRegexPath } from "../../utils";
import gql from "graphql-tag";
import ImageTemplate from "../nav/ImageTemplate";
import { Link } from "@reach/router";
import Paper from "@material-ui/core/Paper";
import NotFound from "../error/NotFound";
import Loading from "../error/Loading";

class DetailPage extends React.Component {
  render() {
    if (this.props.postQuery.error) {
      return <NotFound />;
    }

    if (this.props.postQuery.loading) {
      return <Loading />;
    }

    const { post } = this.props.postQuery;
    let action = this._renderAction(post);

    return (
      <React.Fragment>
        <div className="paperOut">
          <Paper className="paperIn">
            <h1 className="f3 black-80 fw4 lh-solid">
              {post.title} by{" "}
              <Link to={"/user/" + post.author.id} title="Feed">
                {post.author.name}
              </Link>
            </h1>
            <p className="black-80 fw3">{post.text}</p>
            {post.cars.map(car => (
              <Link to={"/car/" + car.id} title="Car" key={car.id}>
                {car.name}
                <br />
              </Link>
            ))}
            <ImageTemplate nameFile={post.nameFile} />

            {action}
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
      return (
        <React.Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.publishDraft(id)}
          >
            Publish
          </a>{" "}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deletePost(id)}
          >
            Delete
          </a>
        </React.Fragment>
      );
    }
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deletePost(id)}
      >
        Delete
      </a>
    );
  };

  deletePost = async id => {
    await this.props.deletePost({
      variables: { id }
    });
    navigate("/");
  };

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id }
    });
    navigate("/");
  };
}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
      nameFile
      cars {
        id
        name
      }
      author {
        id
        name
      }
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(POST_QUERY, {
    name: "postQuery",
    options: props => {
      const pathname = props.location.pathname;
      const matchPath = props.pathContext.matchPath;
      const id = getIdfromRegexPath(pathname, matchPath);
      return {
        variables: {
          id
        }
      };
    }
  }),
  graphql(PUBLISH_MUTATION, {
    name: "publishDraft"
  }),
  graphql(DELETE_MUTATION, {
    name: "deletePost"
  })
)(DetailPage);
