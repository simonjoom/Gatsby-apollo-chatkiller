import React, { Component } from "react";
import TopHello from "./TopHello";
import { navigate } from "gatsby"; 
import { Location } from "@reach/router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import BackButton from "./BackButton";
import Icon from "@material-ui/core/Icon";

class Header extends Component {
  render() {
    return (
      <div className="flexGrow">
        <AppBar position="static">
          <Location>
            {({ location }) => (
              <Toolbar>
                <BackButton location={location} />
                <div className="flex" />
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <Icon>home</Icon>
                </Button>
                <div className="flex" />
                <TopHello />
              </Toolbar>
            )}
          </Location>
        </AppBar>
      </div>
    );
  }
}

export default Header;
