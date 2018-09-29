import React, { Component } from "react";
import ChatsPageList from "./ChatsPageList";
import CreateChat from "./CreateChat";
import Paper from "@material-ui/core/Paper";
import NotAuth from "../error/NotAuth";
import { AUTH_TOKEN } from "../../constants/constants";

class ChatsPage extends Component {
  state = {
    orderBy: "createdAt_ASC",
    openChat: true
  };
 /* componentWillReceiveProps(props) {
    console.log("props" ,props)
    this.setState({ openChat: props.openChat });
  }*/
  render() {
    const authToken = global.isSSR || localStorage.getItem(AUTH_TOKEN); 
    if (!authToken) {
      return <NotAuth />;
    }
    return (
      <div style={{ margin: 10 }}>
        <Paper className="paperIn">
          <h1>Chat</h1> 
            <ChatsPageList orderBy={this.state.orderBy} /> 
          <CreateChat />
        </Paper>
      </div>
    );
  }
}

export default ChatsPage;
