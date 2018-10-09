import React, { Component } from "react";
import ListSideBar from "./ListSideBar";
//import Drawer from '@material-ui/core/Drawer'
import { SideBarContext } from "../../SideBarContext";

class SideBar extends Component {
  render() {
    return (
      <SideBarContext.Consumer>
        {context => (
          <>
            {context.state.isSideBarOpen && (
              <div className="md-cell md-cell--2">
                <div tabIndex={0} role="button">
                  <ListSideBar
                    isMobile={context.state.isMobile}
                    role={context.Me.role}
                  />
                </div>
              </div>
            )}
            {!context.state.isSideBarOpen && (
              <div className="md-cell md-cell--2" />
            )}
          </>
        )}
      </SideBarContext.Consumer>
    );
  }
}

export default SideBar;

/*
            variant={context.state.variant}
            open={context.state.isSideBarOpen}*/
