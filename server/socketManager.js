const io = require('./index').io

const {USER_CONNECTED,VERIFY_USER,LOGOUT } = require("../src/Events");

const {createUser,createMessage,createChat} =require("../src/Factories")

let connectedUser ={}


module.exports = function(socket){


console.log('Socket ID',socket.id);

//Verifies given Username
socket.on(VERIFY_USER,(nickname,callback)=>{
    if(isUser(USER_CONNECTED,nickname)){
     callback({isUser:true,user:null})
    }
    else{
    callback({isUser:false,user:createUser({name:nickname})})
    }
})


socket.on(USER_CONNECTED,(user)=>{

    connectedUser=addUser(connectedUser,user)
    socket.user=user
    console.log(connectedUser)
})

}


function addUser(userList,user){
    let newList = Object.assign({},userList)
    newList[user.name]=user
    return newList;
}

function removeUser(userList,username){

    let newList = Object.assign({},userList)
    delete newList[username]
    return newList
}


function isUser(userList,username){

   username == userList 
  return  userList
}