import React, { Component } from "react";
import Input from "../../reactLIB/Input";
//mport UploadFile from '../nav/UploadFile'

class UserPageForm extends Component {
  render() {
    return (
      <>
        <Input
          id="name"
          label="name"
          onChange={e =>
            this.props.updateUserData({
              ...this.props.user,
              name: e.target.value
            })
          }
          placeholder="name"
          type="text"
          value={this.props.user.name}
          s={12}
        />

        <Input
          id="email"
          label="email"
          onChange={e =>
            this.props.updateUserData({
              ...this.props.user,
              name: e.target.value
            })
          }
          placeholder="email"
          type="email"
          value={this.props.user.email}
          s={12}
        />
      </>
    );
  }
}

export default UserPageForm;

/*
<FormControl>
<InputLabel htmlFor='role'>Role</InputLabel>
<Select inputProps={{
    name: 'role',
    id: 'role'
  }} onChange={e => this.props.updateUserData({
    ...this.props.user,
    role: e.target.value
  })} value={this.props.user.role}>
  <MenuItem value='CUSTOMER'>CUSTOMER</MenuItem>
  <MenuItem value='ADMIN'>ADMIN</MenuItem>
</Select>
</FormControl>

<UploadFile isEditMode={true} nameFile={this.props.user.nameFile} onSelectFile={nameFile => this.props.updateUserData({
  ...this.props.user,
  nameFile: nameFile
})}/>
*/
