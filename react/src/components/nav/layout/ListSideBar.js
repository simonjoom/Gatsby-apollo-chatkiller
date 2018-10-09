import React, { Component } from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import Button from "../../../reactLIB/Button";
import { AUTH_TOKEN } from "../../../constants/constants";

class EmulateItem extends Component {
  render() {
    const liClass = {};
    const subHeading = {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      lineHeight: "1.5em"
    };
    const { icon, to } = this.props;
    return (
      <li style={liClass}>
        <Button
          to={to}
          node={Link}
          className={cx(this.props.className, "link btn-flat")}
          type="material"
          iconStyle={{
            color: "rgba(0, 0, 0, 0.54)",
            flexShrink: 0,
            marginRight: "16px"
          }}
          icon={icon}
        >
          <span style={subHeading}>{this.props.children}</span>
        </Button>
      </li>
    );
  }
}
class ListSideBar extends Component {
  state = {
    isSideBarOpen: false
  };
  /*
  toggleDrawer = (isSideBarOpen) => () => {
    this.setState({isSideBarOpen: isSideBarOpen})
  } 
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({isSideBarOpen: nextProps.isSideBarOpen})
  }
  
        {this.props.isMobile && (
          <MenuItem>
            <ListItemIcon>
              <Icon>arrow_back</Icon>
            </ListItemIcon>
          </MenuItem>
        )}
  */

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <ul>
        <EmulateItem icon="view_quilt" to="/">
          Blog
        </EmulateItem>
        {this.props.role &&
          this.props.role !== "CUSTOMER" && (
            <>
              <EmulateItem icon="directions_car" to="/z/cars">
                Cars
              </EmulateItem>
            </>
          )}

        <EmulateItem icon="chat" to="/z/chats">
          Chat
        </EmulateItem>
        <EmulateItem icon="group" to="/z/users">
          Users
        </EmulateItem>

        {!authToken && (
          <EmulateItem icon="account_circle" to="/z/login">
            Users
          </EmulateItem>
        )}
      </ul>
    );
  }
}

export default ListSideBar;

/*

            <EmulateItem icon="mode_edit" to="/z/drafts">
              Drafts
            </EmulateItem>
            <EmulateItem icon="cloud_queue" to="/z/api">
              API
            </EmulateItem>*/
