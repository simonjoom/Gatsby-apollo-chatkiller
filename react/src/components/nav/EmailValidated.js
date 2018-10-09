import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants/constants"; 
import Icon from "../../reactLIB/Icon";
import Card from "../../reactLIB/Card";
import ResendEmailValidation from "./ResendEmailValidation";

class EmailValidated extends Component {
  state = {
    interval: 0
  };
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    if (authToken && !this.props.emailvalidated) {
      return (
        <div className="paperOut">
          <Card className="paperIn">
            <Icon type="material" className="error_outline" /> Email not
            validated.
            <ResendEmailValidation />
          </Card>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default EmailValidated;
