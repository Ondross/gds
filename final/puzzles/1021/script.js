import {set, push, onValue, onChildAdded, newMessage} from "./firebase.js"

function callback(snapshot) {
    console.log(snapshot.val())
}
onvalue("chatroom/1/name", callback)

function messageCallBack(){
    console.log(snapshot.val())
}

onChildAdded('chatrooms/1/messages', messageCallBack)

push('chatroom/1/messages', {text: 'foo', sender: 'william'})