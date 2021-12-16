import {getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged, getRedirectResult} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

import {chatroomNumber, chatroomsEntered, modifyChatroomNuber, currentUser, currentUserEmail, chatrooms, logOut} from './script.js'

import {set, push, onValue, onChildAdded, get} from "./firebase.js"

import{checkAdmin, banList} from "./Auth.js"

console.log("IMPORTED Commands.js")

let commands = {

    "/clear": clearCurrentRoom,

    "/light": lightMode,

    "/dark": darkMode,

    "/kill": killCurrentChatroom,

    "/clearall" : clearAllMessages,

    "/wrathofgod" : destroyAllCreatures,

    "/killall" : clearChatrooms,

    "/unsubscribe" : unsubscribeFromCurrentChatroom,
}

function clearCurrentRoom(){
    clearChat(chatroomNumber)
}

function clearChat(roomNumber) {
    
    const messages = document.getElementById('messagebox'+roomNumber)

    while(messages.firstChild){
        messages.removeChild(messages.firstChild)
        
    }
  
    set('Jargon/chatrooms/' + roomNumber + '/messages', {})
}

function lightMode(){
    set('Jargon/users/'+currentUser+"/settings/colormode", {darkmode: false, lightmode: true})
    document.getElementsByClassName('jargonheader')[0].style.color = "black"
}

function darkMode(){
    set('Jargon/users/'+currentUser+"/settings/colormode", {darkmode: true, lightmode: false})
    document.getElementsByClassName('jargonheader')[0].style.color = "white"
    
}

function killCurrentChatroom(){
    if(checkAdmin(currentUserEmail)){
        deleteChannel(chatroomNumber)
    } else {
        let room = chatrooms[chatroomNumber]
        room.newMessage("Sorry, you don't have permission to do that.")
    }
}

function deleteChannel(room){
    console.log("DELETNG...",room)
    //alert("Are you sure? You are deleting "+room)
    delete chatroomsEntered.room
    let roomToBeDeleted = document.getElementById(room)
    for(let i = 0; i < document.getElementsByClassName('chatname').length; i++){
        if (document.getElementsByClassName('chatname')[i].id=== "chatname"+room){
            console.log("found chatname to be deleted")
            document.getElementsByClassName('sidebar')[0].removeChild(document.getElementsByClassName('chatname')[i])
        }
    }
    for (let i = 0; i < document.getElementsByClassName('chatroom').length; i++){
        if(document.getElementsByClassName('chatroom')[i].id === room){
            console.log('Found room to be deleted')
            document.getElementsByClassName('chatrooms')[0].removeChild(roomToBeDeleted)
        }
    }
    set('Jargon/chatrooms/' + room + '/messages', null)
    set('Jargon/chatrooms'+room, null)
    onValue("Jargon/chatrooms/", (snapshot) => {
        let item = snapshot.exportVal()
        for (let i = 0; i< Object.keys(item).length;i++){
            let selectedItem = Object.keys(item)[i]
            if (item[selectedItem] === room){
                set("Jargon/chatrooms/"+selectedItem, null)
            }
        }
    })
}

function clearAllMessages(){
    if(checkAdmin(currentUserEmail)){
        console.log('clearAllMessages')
        var elements = document.getElementsByClassName('message')
        let messagesList = document.getElementsByClassName("chatroomOption")
        for(let i = 0; i<messagesList.length; i++){
            let item = messagesList[i]
            set('Jargon/chatrooms/'+item.innerHTML+'/messages', {})
        }
        for(let i = 0; i< chatroomsEntered.length; i++){
            let itemList = Object.keys(chatroomsEntered)
            let selectedItem = item[i]
            chatroomsEntered[selectedItem] = false
            console.log(chatroomsEntered)
        }
        var chatroomsEnteredKeys = Object.keys(chatroomsEntered)
        for(let i = 0; i<chatroomsEnteredKeys.length; i++){
            chatroomsEntered[chatroomsEnteredKeys[i]] = false
        }
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0])
        }
    } else{
        let room = chatrooms[chatroomNumber]
        room.newMessage("Sorry, you don't have permission to do that.")
    }
}

let attempts = 3

function destroyAllCreatures(){
        banList.push(currentUserEmail)
        document.getElementById('everything').style.display = "none"
        document.getElementById('everythingelse').style.display = "none"
        document.getElementsByClassName('passwordcontainer')[0].style.display = "block"
        let pwd = document.getElementsByClassName('password')[0].value

        document.getElementsByClassName('password')[0].onkeypress = (event) => {
            if(event.key === "Enter"){
                //console.log('enter')
                if(pwd === "batman"){
                    banList.pop(currentUserEmail)
                    set('Jargon', {})
                    console.log("GOOD JOB")
                    debugger

                } else {
                    if(attempts <= 0){
                        document.getElementsByClassName('passwordcontainer')[0].style.display = "none"
                        document.getElementById("wrathtext").innerHTML = "Oh well. Better luck next time. Bye."
                        const auth = getAuth()
                        const provider = new GoogleAuthProvider()
                        signOut(auth)
                        signInWithRedirect(auth, provider)
                    } else {
                        document.getElementsByClassName('password')[0].value = ""
                        document.getElementById("wrathtext").innerHTML = "WRONG. You have "+attempts+" attempts remaing before you are banned. Good luck."
                        setInterval(destroyAllCreatures, 100)
                        attempts--
                    }
                    
                }
            }
        }
}


async function clearChatrooms(){
    if(checkAdmin(currentUserEmail)){
        set("Jargon/chatrooms", null)
        const sidebar = document.getElementsByClassName('chatanme')
        for(let i = 0; i < sidebar.length; i++){
            document.getElementsByClassName('sidebar').removeChild(sidebar[i])
        }

        const allChatrooms = document.getElementsByClassName('chatrooms')
        if(allChatrooms.firstChild){
            allChatrooms.removeChild(allChatrooms.firstChild)
        }

    } else {
        let room = chatrooms[chatroomNumber]
        room.newMessage("Sorry, you don't have permission to do that.")
    }

}

function unsubscribeFromCurrentChatroom(){
    let room = chatrooms[chatroomNumber]
    room.unsubscribe()
}



export {commands, clearCurrentRoom, clearChat, lightMode, darkMode}

