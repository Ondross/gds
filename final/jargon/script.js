import {set, push, onValue, onChildAdded, get} from "./firebase.js"

import {getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

import {commands} from "./commands.js"

import {banCheck, banList} from './Auth.js'

import{createChatroomInHTML} from './createChatroomInHTML.js'

import {Chatroom} from './chatroom.js'

import {loadAddedChannels, loadSettings, loadChatroomSettings} from './loadEverything.js'

console.log("IMPORTED Script.js")


window.banList = banList

let chatroomNumber = ""

window.chatroomNumber = chatroomNumber

let chatrooms = {}

window.chatrooms = chatrooms

let chatroomsEntered = {}

let chatroomsSubbedTo = {}

window.chatroomsEntered = chatroomsEntered
window.chatroomsSubbedTo = chatroomsSubbedTo

const textColors = {}

window.textColors = textColors

//initialize current user and email
let currentUser = ""
let currentUserEmail = ""

//check if user is on the window or not
let offTab = false
window.onblur = () => {offTab = true}
window.onfocus = () => {offTab = false}





onValue('Jargon', (snapshot) => {
    console.log(snapshot.exportVal())
})


//brute force data clear
window.clearData = (path) => {
    set("Jargon/"+path, null)
}


function changeTextColor(color){
    if(color){
        for(let i=0; i < Object.keys(textColors).length; i++){
            textColors[Object.keys(textColors)[i]] = false
        } 
        if(!textColors[color]){
            textColors[color] = true
        } else {
            textColors[color] = true
        }
        set("Jargon/users/"+currentUser+"/settings/textcolor", {color: color})
    }
}


onAuthStateChanged(getAuth(), (user) => {

    if(user){
        if(!banCheck(user.email)){
            onChildAdded('Jargon/chatrooms', loadAddedChannels)
            currentUserEmail = user.email
            console.log("USER", user.displayName)
            document.getElementsByClassName('login')[0].style.display = "none"
            document.getElementsByClassName('welcomebanner')[0].style.display = "none"
            document.getElementsByClassName('jargonheader')[0].style.display = "flex"
            document.getElementById('everything').style.display = "flex"
            document.getElementById('everythingelse').style.display = "block"
            currentUser = user.displayName
            push("Jargon/users/"+currentUser+"/settings/colormode", {dark: false, light: false})
            onChildAdded("Jargon/users/"+currentUser+"/settings/colormode", cleanUpFileStructure)
            push("Jargon/users/"+currentUser+"/settings/textcolor", {colorII: false})
            onChildAdded("Jargon/users/"+currentUser+"/settings/textcolor", cleanUpFileStructure)

        } else{
            console.log('BANNED')
        }
    }
})



function logOut(){
    document.getElementById('everything').style.display = 'none'
    document.getElementById('everythingelse').style.display = 'none'
    document.getElementsByClassName('login')[0].style.display = "inline-block"
    document.getElementsByClassName('welcomebanner')[0].style.display = "inline-block"
    document.body.style.background = "white"
}

function cleanUpFileStructure(snapshot){
    let item = snapshot.exportVal()
    let parentNode = snapshot.ref._path.pieces_
    parentNode = parentNode[parentNode.length-2]
    if (typeof item === "object"){
        set("Jargon/users/"+currentUser+"/settings/"+parentNode+"/"+snapshot.key, null)
    }
}


async function messageCallBack(snapshot){

    const chatroomName = snapshot.val().room

    let text = snapshot.val().text
    if(text === undefined){
        console.log("hi")
        text = false
    }

    const user = snapshot.val().sender

    const time = snapshot.val().timeStamp

    let image = snapshot.val().imageURL
    if(image === undefined){
        image = false
    }

    const chatroom = chatrooms[chatroomName]

    if(text && image){
        chatroom.newMessage(user + ": " + text +" "+time, image)
        const fileList = document.getElementById('choosefile'+room)
        fileList.value = ''
    } else if (text && !image){
        chatroom.newMessage(user + ": " + text +" "+time)
    } else if(!text && image){
        chatroom.newMessage(user + ": "+time, image)
    } else{
        console.log("Error 404 - Message has no content!")
    }

    document.getElementById("chatbox"+chatroomName).scrollTop = 69420

    if(offTab === true){
        //console.log("NOTIFYING....")
        onChildAdded('Jargon/chatrooms/' + chatroomNumber + "/messages", notifyUser)
    }

}



function findCurrentColor(){
    if (Object.keys(textColors)[0] != undefined){
        for(let i = 0; i < Object.keys(textColors).length; i++){
            let currentColor = Object.keys(textColors)[i]
            if(textColors[currentColor] === true){
                return currentColor
            }
        }
    }
    
}


function sendToAllChatrooms(message){
    console.log("SENDING TO ALL ROOMS...")
    
    for(let i = 0; Object.keys(chatrooms).length; i++){
        let room = chatrooms[Object.keys[chatrooms][i]]
        room.newMessage(message)
    }

}


function checkTime(){
    var today = new Date()
    let t = today.getHours().toString() + ":" + today.getMinutes().toString()


    if (today.getMinutes() < 10) {
        t = today.getHours().toString() + ":" + "0" + today.getMinutes().toString()
    }
    if (today.getHours() > 12) {
        t = (today.getHours()-12).toString() + ":" + today.getMinutes().toString()
    }

    if (today.getHours() > 12 && today.getMinutes() < 10){
        t = (today.getHours()-12).toString() + ":" + "0" + today.getMinutes().toString()
    }
    if(today.getHours() < 12 && today.getMinutes() < 10){
        t = (today.getHours()).toString() + ":" + "0" + today.getMinutes().toString()
    }
    setTimeout(checkTime, 1000)
    return t
}


checkTime()


function encodeImageFileAsURL() {

    //console.log("ENCODE")

    var filesSelected = document.getElementById("choosefile"+chatroomNumber).files;

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            
            var srcData = fileLoadedEvent.target.result;

            let text = document.getElementById('in'+chatroomNumber).value

            push('Jargon/chatrooms/' + chatroomNumber + '/messages', {text: text, sender: currentUser, imageURL: srcData, timeStamp: checkTime(), room: chatroomNumber})
            
            document.getElementById('in'+chatroomNumber).value = ""
        } 
        document.getElementById('filesubmitlabel'+chatroomNumber).style.display = "none"
        document.getElementById('filepickerlabel'+chatroomNumber).style.display = "inline-block"
        fileReader.readAsDataURL(fileToLoad)

    } else if (filesSelected.length <= 0) {
        let text = document.getElementById('in'+chatroomNumber).value
        document.getElementById('in'+chatroomNumber).value = ""
        if(text.includes("/")){
            console.log("text", text)
            if(Object.keys(commands).includes(text)){
                let val = commands[text]
                val()
                text = ""
            }
        } else if(text.split('')[0] === ":") {
            if(text.split('')[text.split('').length -1] === ":"){
                let emoteName = text.split('')
                emoteName.splice(0,1)
                emoteName.splice(emoteName.length-1, 1)
                let finalEmote = ""
                for(let i = 0; i< emoteName.length; i++){
                    finalEmote = finalEmote + emoteName[i]
                }
                fetchEmote(finalEmote.toLowerCase())
            }
        } else {
            push('Jargon/chatrooms/' + chatroomNumber + '/messages', {text: text, sender: currentUser, timeStamp: checkTime(), room: chatroomNumber})
        }
    }
}

function saveEmote(){
    var filesSelected = document.getElementsByClassName("newemotefile")[0].files;

    var name = document.getElementsByClassName('newemotename')[0].value

    let nameLower = name.toLowerCase()

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            
            var srcData = fileLoadedEvent.target.result;
            
            push('Jargon/emotes/static-images', {name: nameLower, imageURL: srcData})
            
            document.getElementsByClassName('newemotename')[0].value = ""
            console.log("SAVED!")
            //newMessage("New emote saved: "+ name, chatroomNumber)
        } 
        document.getElementsByClassName('newemotename')[0].style.display = 'none'
        fileReader.readAsDataURL(fileToLoad);
    }
}


async function fetchEmote(emote){
    let emoteList = await get("Jargon/emotes/static-images")
    
    if(emoteList != undefined){
        emoteList = emoteList.val()
        for(let i = 0; i < Object.keys(emoteList).length; i++) {
            let selectedItem = emoteList[Object.keys(emoteList)[i]]
            if(typeof selectedItem === "object"){
                let nameOfEmote = selectedItem.name
                if(nameOfEmote === emote){
                    push("Jargon/chatrooms/"+chatroomNumber+"/messages", {sender: currentUser, imageURL: selectedItem.imageURL, room: chatroomNumber, timeStamp: checkTime()})
                }
            } else if(typeof selectedItem === "string"){
                set("Jargon/emotes/static-images/"+(Object.keys(emoteList)[i]), null)
            }
        }
    }
}


function notifyUserInteral(snapshot){

    const room = snapshot.val().room

    if(room === chatroomNumber){
        clearInterval(fadeOutEffect)
    }

    if (room != chatroomNumber){

        let notifRoom = chatrooms[room]

        notifRoom.notifying = true

        console.log("Interal Notif: "+room +" != "+chatroomNumber)
        const sidebar = document.getElementById('chatname'+room)
        sidebar.style.opacity = "1.0"
        // setInterval(function() {
        //     fadeOutEffect(sidebar)
        // }, 400)
        const fadeInterval = setInterval(() => {
            fadeOutEffect(sidebar, fadeInterval)
        }, 400)
    }

}


function fadeOutEffect(target, fadeInterval){

    if(chatroomNumber === target.innerHTML){
        target.style.opacity = "1.0"
        clearInterval(fadeInterval)
        
        console.log(chatroomNumber,target.innerHTML)
    } else if (target.style.background){
        var fadeTarget = target
        target.style.background = "green"
        if(fadeTarget.style.opacity > 0){
            //console.log("1:", fadeTarget.style.opacity)
            fadeTarget.style.opacity = "0"
        } else if (fadeTarget.style.opacity <= 0){
            //console.log("2:", fadeTarget.style.opacity)
            fadeTarget.style.opacity = "1.0"
        }
    } else {console.log("else")}

}



function notifyUser(snapshot) {
    const user = snapshot.val().sender

    //const message = snapshot.val().text

    const room = snapshot.val().room

    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Hey! Listen!', {
                body: user +" sent a new message in "+room
            })

        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Hey! Listen!', {
                        body: user +" sent a new message in "+room
                    })
                } else {
                    console.log('User blocked notifications.')
                }
            }).catch(function (err) {
                console.error(err)
            })
        }
    }
}

window.fetchEmote = fetchEmote

window.chatroomsEntered = chatroomsEntered

export {chatroomNumber, chatroomsEntered, logOut, currentUser, messageCallBack, currentUserEmail, chatroomsSubbedTo, encodeImageFileAsURL, findCurrentColor}

export {chatrooms, changeTextColor, saveEmote, notifyUser, notifyUserInteral, fadeOutEffect}

export function modifyChatroomNuber(value) {chatroomNumber = value}