import {set, push, onValue, onChildAdded, get} from "./firebase.js"

import {Chatroom} from './chatroom.js'

import {currentUser, changeTextColor} from './script.js'

console.log("IMPORTED LoadEverything.js")

function loadAddedChannels(snapshot){
    const selectedItem = snapshot.key
    if (!chatroomsEntered[selectedItem]){
        chatrooms[selectedItem] = new Chatroom(selectedItem)
    }
    if(!chatroomsEntered[selectedItem]){
        chatroomsEntered[selectedItem] = false
    }

    loadSettings()
}

function loadSettings(){
    if (currentUser != ""){
        onValue("Jargon/users/"+currentUser+"/settings/colormode", loadColorMode)
        onValue("Jargon/users/"+currentUser+"/settings/textcolor", loadTextColor)
        onValue("Jargon/users/"+currentUser+"/chatsettings", loadChatroomSettings)

    }
}

function loadChatroomSettings(snapshot){

    const chatroomList = snapshot.exportVal()

    for (let i = 0; i < Object.keys(chatroomList).length; i++){

        const room = Object.keys(chatroomList)[i]
        const newRoom = chatroomList[room]
        const color = newRoom["backgroundcolor"]
        const border = newRoom["bordertype"]
        const chatboxBorder = newRoom["chatboxbordertype"]

        if(document.getElementById(room)){

            document.getElementById(room).style.background = color
            document.getElementById("menu"+room).style.background = color
            document.getElementById(room).style.borderColor = color
            document.getElementById("menu"+room).style.borderColor = color

            if(border){
                document.getElementById(room).style.borderRadius = border
                document.getElementById("menu"+room).style.borderRadius = border
            }

            if(chatboxBorder){
                console.log(chatboxBorder)
                document.getElementById("chatbox"+room).style.borderRadius = chatboxBorder

                if(chatboxBorder === "30px"){
                    document.getElementById("messagebox"+room).style.marginLeft = "10px"
                    document.getElementById("chatbox"+room).style.background = "white"
                }
            }

        }
    }
}

function loadColorMode(snapshot){

    if(snapshot.val().darkmode){

        document.getElementsByClassName('switch-input')[0].checked = true

        document.getElementById('everything').classList = ['darkmode']
        document.getElementById('settingswindow').classList = ['darkmode']
        document.getElementsByClassName('createchannel')[0].classList = ['createchannel darkmode']
        document.getElementsByClassName('newemotecontainer')[0].classList = ['newemotecontainer darkmode']
        document.getElementsByClassName('jargonheader')[0].style.color = "white"
        

        document.body.style.background = "rgb(58, 58, 58)"

    } else if (!(snapshot.val().darkmode)){

        document.getElementsByClassName('switch-input')[1].checked = true

        document.getElementById('everything').classList = ['lightmode']
        document.getElementById('settingswindow').classList = ['lightmode']
        document.getElementsByClassName('createchannel')[0].classList = ['createchannel lightmode']
        document.getElementsByClassName('newemotecontainer')[0].classList = ['newemotecontainer lightmode']
        document.getElementsByClassName('jargonheader')[0].style.color = "black"
        

        document.body.style.background = "white"
    }
}

function loadTextColor(snapshot){

    if(snapshot.val().color){
        const textColor = snapshot.val().color
        const textList = document.getElementsByClassName('text')
        for(let i = 0; i < textList.length; i++){
            const item = textList[i]
            item.style.color = textColor
        }
        changeTextColor(textColor)
        }
}

export {loadAddedChannels, loadSettings, loadChatroomSettings, loadTextColor, loadColorMode}