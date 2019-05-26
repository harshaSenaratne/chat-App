import React, { Component } from 'react'
import {VERIFY_USER} from '../../Events'
export default class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      nickname:"",
      error:""
        }
  }

  setUser=({user,isUser})=>{
    
    console.log("user-->",user ,"isUSer--->",isUser)


    if(isUser){
    this.setError("User Name Taken")
    }
    else{
     this.props.setUser(user)
    }
  }

setError=(error)=>{
 this.setState({
   error
 })
}

 handleSubmit=(e)=>{
   e.preventDefault() 

   const {socket} = this.props
   const {nickname} = this.state
   socket.emit(VERIFY_USER,nickname,this.setUser)
 }

 handleChange=(e)=>{
   this.setState({nickname:e.target.value})
}


  render() {
    const {nickname,error} = this.state
    return (
      <div className="login">
          <form onSubmit={this.handleSubmit} className="login-form">
                <label htmlFor="nickname">
                   <h2>Type a nickname for you</h2>
                </label>
            <input
             ref={(input)=> {this.textInput= input}}
             type="text"
             id='nickname'
             value={nickname}
             onChange={this.handleChange}
             placeholder={'UserName'}
          />
          <div className="error">{error ? error:null}</div>

          </form>
        
      </div>
    )
  }
}
