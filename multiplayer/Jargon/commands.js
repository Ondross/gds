import {chatroomNumber, chatroomsEntered, modifyChatroomNuber, subscribeToRoom, callback, newMessage} from './script.js'

import {set, push, onValue, onChildAdded} from "./firebase.js"

let commands = {

    "/clear": clearCurrentRoom,

    "/light": lightMode,

    "/dark": darkMode,

    "/kill": killCurrentChatroom,

    "/clearall" : clearAllMessages,

    "/wrathofgod" : destroyAllCreatures,

    "/killall" : clearChatrooms,
}

function clearChatrooms(){
    let masterRoom = chatroomNumber
    console.log("CLEAR")
    let list = Object.keys(chatroomsEntered)
    console.log(list)
    console.log(list.length)
    if (Object.keys(chatroomsEntered).length > 4){
        console.log('tru dat')
        for (let i = 4; i < list.length; i++) {
            console.log("deleting channel...")
            console.log(i)
            let room = list[i]
            console.log(room)
            deleteChannel(room)
        }
    }

    modifyChatroomNuber(masterRoom)
    callback()
    subscribeToRoom(masterRoom)

}

function destroyAllCreatures(){
    alert("Are you sure you want to end all life on earth?")
    set('Jargon', {})
    debugger
}


function clearAllMessages(){
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
}

function killCurrentChatroom(){
    deleteChannel(chatroomNumber)
    
    document.getElementById('chatrooms-list').value = chatroomNumber
}

function deleteChannel(room){
    //alert("Are you sure? You are deleting "+room)
    delete chatroomsEntered.room
    let roomToBeDeleted = document.getElementById(room)
    document.getElementById('chatrooms-list').removeChild(roomToBeDeleted)
    if(document.getElementById("messages"+room)){
        let messagesToBeDeleted = document.getElementById("messages"+room)
        document.getElementById('allmessagesboxes').removeChild(messagesToBeDeleted)
        if(messagesToBeDeleted.firstChild){
            messagesToBeDeleted.removeChild(messagesToBeDeleted.firstChild)
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
    let chatroomMasterList = document.getElementsByClassName('chatroomOption')
    for(let i = 0; i< chatroomMasterList.length;i++){
        let currentRoom = chatroomMasterList[i].innerHTML
        newMessage(userName+" has deleted a channel: "+room, currentRoom)
    }
    let indexOfRoom = Object.keys(chatroomsEntered).indexOf(room)
    let newRoom = Object.keys(chatroomsEntered)[indexOfRoom-1]
    modifyChatroomNuber(newRoom)
    callback()
    subscribeToRoom(chatroomNumber)
}


function darkMode(){
    set('Jargon/users/'+userName+"/settings/colormode", {darkmode: true, lightmode: false})
    
}

function lightMode(){
    set('Jargon/users/'+userName+"/settings/colormode", {darkmode: false, lightmode: true})
}

function clearCurrentRoom(){
    clearChat(chatroomNumber)
}

function clearChat(roomNumber) {
    
    const messages = document.getElementById('messages'+roomNumber)

    while(messages.firstChild){
        messages.removeChild(messages.firstChild)
        
    }
  
    set('Jargon/chatrooms/' + roomNumber + '/messages', {})
}

export {commands, clearCurrentRoom, clearChat, lightMode, darkMode}

