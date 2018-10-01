import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "../../reactLIB/Button";
import axios from "axios";

class Api extends React.Component {
  state = {
    message: ""
  };

  callApi() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth-token")
      },
      data: { query: "query{\n  me{\n    role \n  }\n}" }
    })
      .then(res => {
        this.setState({
          message: res.data
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>API</h2>
          <Button
            onClick={() => this.callApi()}
            variant="raised"
            color="primary"
          >
            Call API
          </Button>
          {this.state.message && (
            <Paper>
              <pre>{JSON.stringify(this.state.message, null, 2)}</pre>
            </Paper>
          )}
        </Paper>
      </div>
    );
  }
}

export default Api;
