import React, { Component } from "react";
import CarsPageList from "./CarsPageList";
import { navigate } from "gatsby";
import Button from "../../reactLIB/Button";
import Paper from "@material-ui/core/Paper";
import ArrowOrderBy from "./ArrowOrderBy";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import NotAuth from "../error/NotAuth";
import { AUTH_TOKEN } from "../../constants/constants";

class CarsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      orderBy: "name_ASC"
    };
  }

  elemClicked(elem) {
    navigate("/car/" + elem.id);
  }

  render() {
    const clearQuery = () => {
      this.setState({
        query: ""
      });
    };
    const authToken = (process.env.GATSBY_BUILD_STAGE!=="build-html") && localStorage.getItem(AUTH_TOKEN)||true;
    if (!authToken) {
      return <NotAuth />;
    }
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <Input
            onChange={e => this.setState({ query: e.target.value })}
            value={this.state.query}
            type="text"
            label="Search"
            endAdornment={
              <div position="end">
                {this.state.query ? (
                  <Icon onClick={clearQuery}>clear</Icon>
                ) : (
                  <Icon className="white">sentiment_satisfied</Icon>
                )}
                <ArrowOrderBy
                  orderBy={this.state.orderBy}
                  onOrderBy={orderBy => this.setState({ orderBy: orderBy })}
                />
              </div>
            }
          />{" "}
          <Button
            onClick={() => navigate("/car/create")}
            variant="raised"
            color="primary"
          >
            + Create Car
          </Button>
          <CarsPageList
            showWhenQueryEmpty={true}
            query={this.state.query}
            showTitle={true}
            showMore={true}
            elemClicked={this.elemClicked.bind(this)}
            orderBy={this.state.orderBy}
          />
        </Paper>
      </div>
    );
  }
}

export default CarsPage;
