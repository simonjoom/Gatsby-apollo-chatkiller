import React, { Component } from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import Button from "../../../reactLIB/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
import { AUTH_TOKEN } from "../../../constants/constants";

export class EmulateItem extends Component {
  render() {
    const liClass = {
      display: "flex",
      alignItems: "center",
      paddingLeft: "12px",
      paddingTop: "12px",
      paddingBottom: "12px",
      justifyContent: "flex-start"
    };
    const subHeading = {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      lineHeight: "1.5em"
    };
    const { icon, to } = this.props;
    return (
      <Link to={to} className="link">
        <li style={liClass}>
          <Button
            className={cx(this.props.className, "btn-flat")}
            type="material-icons"
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
      </Link>
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
  }*/

  render() {
    const authToken = global.isSSR || localStorage.getItem(AUTH_TOKEN);
    return (
      <div>
        <List>
          <div>
            {this.props.isMobile && (
              <MenuItem>
                <ListItemIcon>
                  <Icon>arrow_back</Icon>
                </ListItemIcon>
              </MenuItem>
            )}

            <EmulateItem icon="view_quilt" to="/">
              Blog
            </EmulateItem>
            {this.props.role !== "CUSTOMER" && (
              <>
                <EmulateItem icon="mode_edit" to="/drafts">
                  Drafts
                </EmulateItem>
                <EmulateItem icon="directions_car" to="/cars">
                  Cars
                </EmulateItem>
                <EmulateItem icon="cloud_queue" to="/api">
                  API
                </EmulateItem>
              </>
            )}
            <Link to="/chats" className="link">
              <MenuItem>
                <ListItemIcon>
                  <Icon>chat</Icon>
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </MenuItem>
            </Link>
            <Link to="/users" className="link">
              <MenuItem>
                <ListItemIcon>
                  <Icon>group</Icon>
                </ListItemIcon>
                <ListItemText primary="Users" />
              </MenuItem>
            </Link>

            {!authToken && (
              <Link to="/login" className="link">
                <MenuItem>
                  <ListItemIcon>
                    <Icon>account_circle</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </MenuItem>
              </Link>
            )}
          </div>
        </List>
      </div>
    );
  }
}

export default ListSideBar;

