import {createChatroomInHTML} from './createChatroomInHTML.js'

import{findCurrentColor, chatroomsSubbedTo, messageCallBack, currentUser, chatroomNumber, notifyUserInteral, fadeOutEffect} from './script.js'

import {set, push, onValue, onChildAdded, get} from "./firebase.js"

console.log("IMPORTED Chatroom.js")

class Chatroom {
    constructor(room) {
        this.room = room


        //makes sidebar button
        this.newChannel = document.createElement('div')
        this.newChannel.id = "chatname"+this.room
        this.newChannel.innerHTML = this.room
        this.newChannel.className = "chatname"
        document.getElementsByClassName('sidebar')[0].appendChild(this.newChannel)

        //makes + initializes chatroom html
        createChatroomInHTML(this.room)

        //makes chatroom messagesbox
        this.messagebox = document.createElement('div')
        this.messagebox.className = "messagebox"
        this.messagebox.id = "messagebox"+this.room
        document.getElementById("chatbox"+this.room).appendChild(this.messagebox)

        //is chatroom being notified?
        this.notifying = false
    }

    unsubscribe() {
        console.log("UNSUBSCRIBED to room " +this.room)
    
        document.getElementById("chatname"+this.room).style.background = "black"
    
        const messages = document.getElementById(this.room)
    
        const roomDiv = document.getElementById('messagebox' + this.room)
    
        messages.style.display = "none"
        
        chatroomsSubbedTo[this.room] = false

        //click animations
        document.getElementById("chatname"+this.room).style.boxShadow = "none"
    }

    // turnOnRoomNotifs(){
    //     notifyUserInteral(this.room)
    // }


    subscribe() {

        chatroomsSubbedTo[this.room] = true

        document.getElementById('chatname'+this.room).style.background = "skyblue"

        console.log("SUBSCRIBED to room " +this.room)

        const messages = document.getElementById(this.room)

        if(!messages){
            createChatroomInHTML(this.room)
            messages.style.display = "flex"
        } else if (messages){
            messages.style.display = "flex"
        }

        const roomDiv = document.getElementById('messagebox' + this.room)
        if (!roomDiv) {
            const box = document.createElement('div')
            box.className = "messagebox"
            box.id = "messagebox" + this.room
            document.getElementById('chatbox'+this.room).appendChild(box)
        }

        if (chatroomsEntered[this.room] === false || undefined) {

            const chatroom = chatrooms[this.room]
            chatroom.newMessage("Hello, Welcome to " +this.room)
            onChildAdded('Jargon/chatrooms/' + this.room + '/messages', messageCallBack)

            onChildAdded('Jargon/chatrooms/'+this.room+"/messages", notifyUserInteral)
           
            chatroomsEntered[this.room] = true
            

        } else if (chatroomsEntered[this.room] === true) {
            console.log('else')
        }

        //click animations
        document.getElementById("chatname"+this.room).style.boxShadow = "3px 3px, 5px 5px white"
    }


    newMessage(text, image) {

        //makes message div
        const message = document.createElement("div")
        message.className = "message"
    
        //text of the message --- user, time, text, etc.
        const textDiv = document.createElement("div")
        textDiv.innerHTML = text
        textDiv.className = "text"
        //changes text color to match usersettings in realtime
        if (findCurrentColor()){
            textDiv.style.color = (findCurrentColor()).toString()
        }
        message.appendChild(textDiv)
    
        //if there was a image, add it
        if (image) {
            const imgDiv = document.createElement("img")
            imgDiv.src = image
            imgDiv.className = 'image'
            message.appendChild(imgDiv)
            document.getElementById('messagebox'+this.room).appendChild(message)
        } else {
            document.getElementById('messagebox'+this.room).appendChild(message) 
            
        }
    }

    changeBackground(color){
        set("Jargon/users/"+currentUser+"/chatsettings/"+this.room+"/backgroundcolor", color)
        document.getElementById(this.room).style.background = color
        document.getElementById(this.room).style.borderColor = color
        document.getElementById("menu"+this.room).style.background = color
        document.getElementById("menu"+this.room).style.borderColor = color
    }

    changeBorder(px){
        px = px+"px"
        set("Jargon/users/"+currentUser+"/chatsettings/"+this.room+"/bordertype", px)
        document.getElementById(this.room).style.borderRadius = px
        document.getElementById("menu"+this.room).style.borderRadius = px
    }

    changeChatboxBorder(px, type){
        px = px+"px"
        set("Jargon/users/"+currentUser+"/chatsettings/"+this.room+"/chatboxbordertype", px)
        document.getElementById("chatbox"+this.room).style.borderRadius = px

        if(px === "30px"){
            document.getElementById('messagebox'+this.room).style.marginLeft = "10px"
            document.getElementById('chatbox'+this.room).style.background = "white"
        } else if (px === "0px"){
            document.getElementById('messagebox'+this.room).style.marginLeft = "0px"
            document.getElementById('chatbox'+this.room).style.background = "white"
        }
    }
}


export {Chatroom}