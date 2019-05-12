import React, { Component } from 'react'
import io from 'socket.io-client';
import {USER_CONNECTED,LOGOUT} from '../../Events'
const socketURL ='http://192.168.1.102:4000/'
export default class index extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         socket:null,
         user:null
      }
    }

    componentWillMount() {
      this.initSocket();
    }
    
// Connect and initializes the socket
    initSocket=()=>{
     const socket = io(socketURL)
     socket.on('connect',()=>{
       console.log('Connected!!')
     })
     this.setState({socket});
    }

// Sets user property in state : @params user {id:number , name:string}

    setUser=(user)=>{
    const {socket}=this.state
    socket.emit(USER_CONNECTED, user)
    this.setState({user})
    }

// Sets user property in state to null

    logout=()=>{
      const {socket}=this.state
      socket.emit(LOGOUT)
      this.setState({user})
      }
    
  render() {
      const {title} = this.props
    return (
      <div className="container">
         {title}
      </div>
    )
  }
}
