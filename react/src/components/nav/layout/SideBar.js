import React, {Component} from 'react'
import ListSideBar from './ListSideBar'
import Drawer from '@material-ui/core/Drawer'
import {SideBarContext} from '../../SideBarContext'

class SideBar extends Component {
  render() { 
    return (
      <SideBarContext.Consumer>
        {context => (
          <Drawer
            variant={context.state.variant}
            open={context.state.isSideBarOpen} >
            <div
              tabIndex={0}
              role='button' 
              >
              <ListSideBar isMobile={context.state.isMobile} role={context.Me.role}/>
            </div>
          </Drawer>
        )}
      </SideBarContext.Consumer>
    )
  }
}  

export default  SideBar