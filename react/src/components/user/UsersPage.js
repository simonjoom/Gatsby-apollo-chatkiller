import React from "react";
import { navigate } from "gatsby";
import Card from "../../reactLIB/Card";
import Input from "../../reactLIB/Input"; 
import UsersPageList from "./UsersPageList";

class UsersPage extends React.Component {
  state = {
    query: "",
    orderBy: "name_ASC"
  };

  elemClicked(elem) {
    navigate("/z/user/" + elem.id);
  }

  render() {
    return (
      <div className="paperOut">
        <Card className="paperIn">
          <div className="flex justify-between items-center">
            <h1>Users</h1>
          </div>
          <Input
            onChange={e => this.setState({ query: e.target.value })}
            value={this.state.query}
            type="text"
            label="Search"
          />
          <UsersPageList
            showWhenQueryEmpty={true}
            query={this.state.query}
            showTitle={true}
            showMore={true}
            elemClicked={this.elemClicked.bind(this)}
            orderBy={this.state.orderBy}
          />
        </Card>
      </div>
    );
  }
}

export default UsersPage;
