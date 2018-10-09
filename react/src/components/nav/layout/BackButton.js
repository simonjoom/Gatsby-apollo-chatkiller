import React, { Component } from "react";
//import Button from '@material-ui/core/Button'
import Button from "../../../reactLIB/Button";
//import Icon from "@material-ui/core/Icon";
import { SideBarContext } from "../../SideBarContext";

class BackButton extends Component {
  render() {
    console.log("BackButton", this.props);
    return (
      <SideBarContext.Consumer>
        {context => (
          <>
            {this.props.location.pathname !== "/" ? (
              <Button onClick={() => window.history.back()} icon="arrow_back" flat
              type="material"/>
            ) : (
              <Button onClick={() => context.toggleDrawer(true)} icon="menu" flat
              type="material"/>
            )}
          </>
        )}
      </SideBarContext.Consumer>
    );
  }
}

export default BackButton;
