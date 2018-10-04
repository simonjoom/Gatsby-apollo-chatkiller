import React from 'react'
import ImageTemplate from '../nav/ImageTemplate'
import CardPanel from '../../reactLIB/CardPanel'
import CardHeader from '@material-ui/core/CardHeader'
import Tooltip from '@material-ui/core/Tooltip'

var parse = require('date-fns/parse')
var format = require('date-fns/format')

class Chat extends React.Component {
  openProfile(author) {
   // this.props.history.push('/user/'+ author.id)
  }
  render() {
    return ( 
        <CardPanel style={cardStyle}>
          <CardHeader
            root={{cardHeaderStyle}}
            avatar={
              <div>
                {this.props.chat.author && (
                  <Tooltip  title={this.props.chat.author.name}>
                    <div onClick={()=>this.openProfile(this.props.chat.author)}>
                      <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
                    </div>
                  </Tooltip>
                )}
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
  borderRadius: '10px',
  // paddingBottom:'10px',
  margin:'5% 5%'
}

const cardHeaderStyle={
  paddingTop: 10,
  margin:50
}

export default Chat
