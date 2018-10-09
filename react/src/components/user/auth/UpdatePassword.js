import React, { Component } from "react";
import { AUTH_TOKEN } from "../../../constants/constants";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Card from "../../../reactLIB/Card";
import Button from "../../../reactLIB/Button";
import NotAuth from "../../error/NotAuth";
import Password from "./Password";
import ProgressBar from "../../../reactLIB/ProgressBar";
class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
    activeStep: 0,
    inputValidation2: false,
    maxStep: 3
  };
  notifyAboutComment(comment) {
    var toastHTML =
      "<span>" +
      comment +
      "</span><button class='btn-flat toast-action'>Undo</button>";
      console.log("notifyAboutComment",M)
    typeof M !== "undefined" && M.toast({ html: toastHTML });
  }

  calculateBuffer() {
    let data = "";
    if (this.state.activeStep === 0) {
      data = this.state.oldPassword;
    }
    if (this.state.activeStep === 1) {
      data = this.state.newPassword;
    }
    if (this.state.activeStep === 2) {
      data = this.state.newPassword2;
    }
    let maxValue = data.length / 10 > 1 ? 1 : data.length / 10;
    return ((this.state.activeStep + maxValue) * 100) / this.state.maxStep;
  }

  handleNext = () => {
    if (this.state.inputValidation2) {
      this.setState(
        {
          activeStep: this.state.activeStep + 1
        },
        function() {
          this.inputRef.focus();
        }
      );
      if (this.state.activeStep === 2) {
        this._confirm();
      }
    }
  };

  handleKey = data => {
    if (data.charCode === 13) {
      //keyPress enter
      this.handleNext();
    }
  };
  setRef = ref => {
    this.inputRef = ref;
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (!authToken) {
         return <NotAuth />;
    }
    const ButtonNext = ({ icon = "navigate_next" }) => (
      <Button onClick={this.handleNext} type="material" icon={icon} floating />
    );
    return (
      <div className="paperOut">
        <Card className="paperIn">
          <h4 className="mv3">Change Password</h4>
          <div className="flex flex-column">
            <ProgressBar
              progress={(this.state.activeStep * 100) / this.state.maxStep}
              variant="buffer"
              valueBuffer={this.calculateBuffer()}
            />

            <br />
            <div className="tac">
              <div
                className={
                  "wrapperAnimate " +
                  (this.state.activeStep === 0 ? "focusField" : "notFocusField")
                }
              >
                <Password
                  handleNext={this.handleNext}
                  id="oldPassword"
                  label="Your actual password"
                  onChange={state =>
                    this.setState(
                      {
                        oldPassword: state.password,
                        inputValidation2: state.inputValidation2
                      }
                    )
                  }
                  setRef={this.setRef}
                  ButtonNext={ButtonNext}
                />
              </div>
              {this.state.activeStep >= 1 && (
                <div
                  className={
                    "wrapperAnimate " +
                    (this.state.activeStep >= 1
                      ? "focusField"
                      : "notFocusField")
                  }
                >
                  <Password
                    handleNext={this.handleNext}
                    id="newPassword"
                    label="Choose a safe password"
                    onChange={state =>
                      this.setState(
                        {
                          newPassword: state.password,
                          inputValidation2: state.inputValidation2
                        }
                      )
                    }
                    setRef={this.setRef}
                    ButtonNext={ButtonNext}
                  />
                </div>
              )}
              <br />
              <br />
              {this.state.activeStep >= 2 && (
                <div
                  className={
                    "wrapperAnimate " +
                    (this.state.activeStep >= 2
                      ? "focusField"
                      : "notFocusField")
                  }
                >
                  <Password
                    handleNext={this.handleNext}
                    id="newPassword2"
                    label="Retype your password"
                    onChange={state =>
                      this.setState(
                        {
                          newPassword2: state.password,
                          inputValidation2: state.inputValidation2
                        }
                      )
                    }
                    setRef={this.setRef}
                    ButtonNext={ButtonNext}
                    nextIcon="done"
                  />
                </div>
              )}
              <div className="flex mt3">
                <Button raised onClick={() => this._confirm()}>
                  Ok
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  _confirm = async () => {
    if (
      !this.state.newPassword ||
      !this.state.newPassword2 ||
      !this.state.oldPassword
    ) {
      this.notifyAboutComment("Password cannot be null");
      this.setState({ activeStep: 0 });
      return;
    }
    if (this.state.newPassword !== this.state.newPassword2) {
      this.notifyAboutComment("Error: Passwords are differents");
      this.setState({ activeStep: 1 });
      return;
    }
    const { oldPassword, newPassword } = this.state;
    await this.props
      .updatePasswordMutation({
        variables: {
          oldPassword,
          newPassword
        }
      })
      .then(() => {
        this.notifyAboutComment(`Your password has been changed successfully!`);
        this.setState({
          oldPassword: "",
          newPassword: "",
          newPassword2: "",
          activeStep: 0
        });
      })
      .catch(e => {
        this.setState({ activeStep: 0 });
        this.notifyAboutComment(e.graphQLErrors[0].message);
      });
  };

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("userToken", JSON.stringify(user));
  };
}

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation(
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_PASSWORD_MUTATION, { name: "updatePasswordMutation" })
)(ChangePassword);
