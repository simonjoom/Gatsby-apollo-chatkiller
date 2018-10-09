import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoSkiscool from "../components/logo";

export const UserShape = {
  background: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string
};

export class UserView extends Component {
  render() {
    const { background, image, name, email } = this.props;
    return (
      <div className="user-view">
        <LogoSkiscool/>
        {image && (
          <a href="#!user">
            <img className="circle" src={image} />
          </a>
        )}
        {name && (
          <a href="#!name">
            <span className="white-text name">{name}</span>
          </a>
        )}
        {email && (
          <a href="#!email">
            <span className="white-text email">{email}</span>
          </a>
        )}
      </div>
    );
  }
}

UserView.propTypes = UserShape;

export default UserView;
