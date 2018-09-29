import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {SideBarContext} from '../../SideBarContext'

class BackButton extends Component {
  render() {
    console.log("BackButton",this.props)
    return (
      <div>
        <SideBarContext.Consumer>
          {context => (
            <div>
            {this.props.location.pathname !== '/' ? (
              <Button onClick={()=>window.history.back()}>
                <Icon>arrow_back</Icon>
              </Button>
            ) : (
              <Button
                onClick={()=>context.toggleDrawer(true)}>
                <Icon>menu</Icon>
              </Button>
            )}
          </div>
          )}
        </SideBarContext.Consumer>
      </div>
    )
  }
}

export default BackButton
