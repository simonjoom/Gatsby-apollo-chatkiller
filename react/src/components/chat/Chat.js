import React, { Component } from "react";
//mport ImageTemplate from '../nav/ImageTemplate'
import Card from "../../reactLIB/Card";
import Button from "../../reactLIB/Button";
import { navigate } from "gatsby";

var parse = require("date-fns/parse");
var format = require("date-fns/format");

class Chat extends Component {
  openProfile(author) {
    navigate("/z/user/" + author.id);
  }
  render() {
    console.log("createdAt", this.props.chat.createdAt);
    return (
      <Card
        className="card-panel cardchat"
        horizontal
        style={cardStyle}
        contentImage={
          this.props.chat.author && (
            <Button
              floating
              tooltip={this.props.chat.author.name}
              onClick={() => this.openProfile(this.props.chat.author)}
            >
              <img
                src="/assets/starter-logo-1024.png"
                width="40px"
                height="40px"
              />
            </Button>
          )
        }
        title={<b>{this.props.chat.message}</b>}
        children={format(parse(this.props.chat.createdAt), "MM/DD/YYYY hh:mma")}
      />
    );
  }
}
const cardStyle = {
  boxShadow: "0px 0px 10px 0px black",
  padding: 0,
  borderRadius: "10px"
};

export default Chat;

/*
<ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/> */
