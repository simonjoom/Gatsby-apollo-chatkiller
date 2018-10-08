import React from 'react'
// import ImageTemplate from '../nav/ImageTemplate'
import CardPanel from '../../reactLIB/CardPanel'
import CardHeader from '@material-ui/core/CardHeader'
// import Tooltip from '@material-ui/core/Tooltip'
import {withStyles} from '@material-ui/core/styles'
import image from '../../../public/newavatar.png'

var parse = require('date-fns/parse')
var format = require('date-fns/format')

const StyledCard = withStyles({
  root:{
    paddingTop: 10
  }
})(CardHeader)

class Chat extends React.Component {
  openProfile(author) {
   // this.props.history.push('/user/'+ author.id)
  }
  render() {
    return ( 
        <CardPanel style={cardStyle}>
          <StyledCard
            root={{cardHeaderStyle}}
            avatar={
              <div>
                {/* {this.props.chat.author && (
                  <Tooltip  title={this.props.chat.author.name}>
                    <div onClick={()=>this.openProfile(this.props.chat.author)}>
                      <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
                    </div>
                  </Tooltip>
                )} */}
                {/* <img src={image} width='40px' height="40px"/> */}
                <img src={image} width="40px" height="40px" style={{borderRadius:'100%', backgroundColor:'grey', padding: '1.5%'}}/>
              </div>
            }
            title={<b>{this.props.chat.message}</b>}
            subheader={format(parse(this.props.chat.createdAt), 'MM/DD/YYYY hh:mma')}
          />
        </CardPanel> 
    )
  }
}
const cardStyle = {
  height: '60px',
  boxShadow: '0px 0px 10px 0px black',
  padding:0,
  borderRadius: '5px',
  // paddingBottom:'10px',
  margin:'5% 5%'
}

const cardHeaderStyle={
  paddingTop: 10,
  margin:50
}

export default Chat
