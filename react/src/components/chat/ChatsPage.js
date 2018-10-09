import React, { Component } from "react";
import ChatsPageList from "./ChatsPageList";
import CreateChat from "./CreateChat";
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
    const authToken = localStorage.getItem(AUTH_TOKEN); 
    if (!authToken) {
      return <NotAuth />;
    }
    return (
      <div style={{ margin: 0, padding:0, backgroundColor: 'white' }}>
        <div className="paperIn" style={{margin:0, padding:0, marginTop: 5}}>
          <p style={{fontSize:'1.4em', margin:10}}>Let's know if you have any questions</p> 
            <ChatsPageList orderBy={this.state.orderBy} /> 
          <CreateChat />
        </div>
      </div>
    );
  }
}

export default ChatsPage;
