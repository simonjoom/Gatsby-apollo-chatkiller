import React, { Component } from "react";
import { navigate } from "gatsby"; 
import { AUTH_TOKEN } from "../../../constants/constants";

import Dropdown from "../../../reactLIB/Dropdown";
import NavItem from "../../../reactLIB/NavItem";

class MenuAvatar extends Component {
  handleClick = event => {
    //   this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = page => {
    // this.setState({ anchorEl: null });
    if (page === "profile") {
      navigate("/z/user/" + this.props.user.id);
    }
    if (page === "logout") {
      localStorage.removeItem(AUTH_TOKEN);
      navigate(`/z/login`);
    }
    //  this.setState({ open: false });
  };

  render() {
    return (
      <Dropdown
        trigger={
          <div className="btn btn-large"> 
              <img src="/static/assets/starter-logo-1024.png" /> 
          </div>
        }
      >
        <NavItem key="Profile" onClick={() => this.handleClose("profile")}>
          Profile
        </NavItem>
        <NavItem key="Logout" onClick={() => this.handleClose("logout")}>
          Logout
        </NavItem>
      </Dropdown>
    );
  }
}

export default MenuAvatar;
