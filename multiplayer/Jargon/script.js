import {set, push, onValue, onChildAdded, get} from "./firebase.js"

import {getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

import {commands, clearCurrentRoom, lightMode, clearChat, darkMode} from "./commands.js"

let chatroomNumber = "The Foyer"

let newChannelName = ""

var numberOfMessages = 0

var chatroomsEntered = {

    "The Foyer": false,

    "The Living Room": false,

    "The Dining Room": false,

    "The Bathroom": false,
}

var textColors = {}

onValue('Jargon', (snapshot) => {
    console.log(snapshot.exportVal())
})



window.clearData = (path) => {
    set("Jargon/"+path, null)
}


document.getElementById('filesubmitlabel').style.background = "lightgreen"


function checkMode(snapshot){
    //console.log(snapshot.exportVal())
    if(snapshot.val().darkmode){

        document.getElementById('settings-window').classList = ['darkmode']
        document.getElementById('text-color-header').classList = ['darkmode']

        document.body.style.background = "grey"

        document.getElementById('filepickerlabel').style.color = "black"
        document.getElementById('foo').style.color = "black"
        document.getElementById('chatrooms-list').style.background = 'grey'

        document.getElementById('darkmode').innerHTML = "Dark Mode"
        document.getElementById('lightmode').innerHTML = "Light Mode: On"
    } else if (!(snapshot.val().darkmode)){

        document.getElementById('settings-window').classList = ['lightmode']
        document.getElementById('text-color-header').classList = ['lightmode']

        document.getElementById('filepickerlabel').style.color = "black"
        document.getElementById('foo').style.color = "black"
        document.getElementById('chatrooms-list').style.background = 'white'

        document.getElementById('darkmode').innerHTML = "Dark Mode: On"
        document.getElementById('lightmode').innerHTML = "Light Mode"

        let text = document.getElementsByClassName('text')
        document.body.style.background = "white"
    }
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
        set("Jargon/users/"+userName+"/settings/textcolor", {color: color})
    }
}

function loadTextColor(snapshot){
    const textColor = snapshot.val().color
    let textList = document.getElementsByClassName('text')
    for(let i = 0; i < textList.length; i++){
        let item = textList[i]
        item.style.color = textColor
    }
    document.getElementById('foo').style.color = textColor
    document.getElementById('Welcome').style.color = textColor
    document.getElementById('filepickerlabel').style.color = textColor
    document.getElementById('chatrooms-list').style.color = textColor
    document.getElementById('in').style.color = textColor
    document.getElementById('in').style.border = "solid 2px "+textColor
    changeTextColor(textColor)
}


let currentUser = ""

onAuthStateChanged(getAuth(), (user) => {
    console.log("AUTH State Changed")
    //document.getElementById('literally-everything').style.display = "block"
    if(user){
        console.log("USER", user.displayName)
        document.getElementById('login').style.display = "none"
        document.getElementById('welcome-banner').style.display = "none"
        document.getElementById('literally-everything').style.display = 'block'
        currentUser = user.displayName
        loadSettings()
        push("Jargon/users/"+currentUser+"/settings/colormode", {dark: false, light: false})
        onChildAdded("Jargon/users/"+currentUser+"/settings/colormode", cleanUpFileStructure)
        push("Jargon/users/"+currentUser+"/settings/textcolor", {colorII: false})
        onChildAdded("Jargon/users/"+currentUser+"/settings/textcolor", cleanUpFileStructure)
    }
})

function logOut(){
    document.getElementById('literally-everything').style.display = 'none'
    document.getElementById('login').style.display = "inline-block"
    document.getElementById('welcome-banner').style.display = "inline-block"
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

function loadSettings(){
    if (currentUser != ""){
        onValue("Jargon/users/"+currentUser+"/settings/colormode", checkMode)
        onValue("Jargon/users/"+currentUser+"/settings/textcolor", loadTextColor)
    }
}


function callback() {
    let foo = document.getElementById("foo")
    foo.innerHTML = chatroomNumber
}


function messageCallBack(snapshot){
    //console.log(snapshot.val().sender, snapshot.val().text)
    if (snapshot.val().imageURL && snapshot.val().sender && snapshot.val().text != undefined) {
        newMessage((snapshot.val().sender + ": " + snapshot.val().text + " " + snapshot.val().timeStamp), chatroomNumber, snapshot.val().imageURL)
        let fileList = document.getElementById('choosefile')
        fileList.value = ''
    } else if (snapshot.val().imageURL === undefined) {
        newMessage((snapshot.val().sender + ": " + snapshot.val().text + " " + snapshot.val().timeStamp), chatroomNumber)
    } else if (snapshot.val().text === undefined){
        newMessage(snapshot.val().sender + ": ", chatroomNumber, snapshot.val().imageURL)     
    } else {
        console.log("Error 404 - Message has no content")
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


function newMessage(text,room,image){
    if(!document.getElementById("messages"+room)){
        const box = document.createElement('div')
        box.className = "messagesbox"
        box.id = "messages" + room
        box.style.display = "none"
        document.getElementById('allmessagesboxes').appendChild(box)
    }
    const messagesDiv = document.getElementById("messages"+room)
    const newDiv = document.createElement("div")
    if(text != undefined){
        newDiv.className = "message"
        newDiv.id = "message"+numberOfMessages
        const textDiv = document.createElement("div")
        textDiv.innerHTML = text
        textDiv.className = "text"
        if (findCurrentColor()){
            textDiv.style.color = (findCurrentColor()).toString()
        }
        newDiv.appendChild(textDiv)
    }

    if (image) {

        const imgDiv = document.createElement("img")
        imgDiv.src = image
        imgDiv.className = 'image'
        newDiv.appendChild(imgDiv)
        messagesDiv.appendChild(newDiv) 
        //document.getElementById('message'+numberOfMessages).style.border = ""

    } else if (!image) {
        messagesDiv.appendChild(newDiv) 
        
    }
    
    numberOfMessages++
}


function subscribeToRoom(number) {
    chatroomNumber = number

    const allBoxes = document.getElementsByClassName("messagesbox")
    if (allBoxes.length) {
        for (let i = 0; i < allBoxes.length; i++) {
            allBoxes[i].style.display = "none"
        }
    }

    let roomDiv = document.getElementById('messages' + chatroomNumber)
    if (!roomDiv) {
        const box = document.createElement('div')
        box.className = "messagesbox"
        box.id = "messages" + chatroomNumber
        document.getElementById('allmessagesboxes').appendChild(box)
    }
    document.getElementById("messages" + chatroomNumber).style.display = "block"

    callback()
    if (chatroomsEntered[chatroomNumber] === false) {
        newMessage("Hello, welcome to "+chatroomNumber, chatroomNumber)
        onChildAdded('Jargon/chatrooms/' + chatroomNumber + '/messages', messageCallBack)
        let list = Object.keys(chatroomsEntered)
        let val = list.indexOf(chatroomNumber)
    } else if (chatroomsEntered[chatroomNumber] === true) {
        console.log('else')
    }
    
    chatroomsEntered[chatroomNumber] = true

}


document.getElementById("chatrooms-list").onchange = (event) => {
    subscribeToRoom(event.target.value)
}

subscribeToRoom('The Foyer')

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

function loadAddedChannels(snapshot){
    const selectedItem = snapshot.key
    if (!document.getElementById(selectedItem)){
        if(selectedItem && !(selectedItem.toString().includes('['))){
            if(selectedItem != undefined){
                if(!chatroomsEntered[selectedItem]){
                    chatroomsEntered[selectedItem] = false
                }
                const newChannelOption = document.createElement('option')
                newChannelOption.id = selectedItem
                newChannelOption.innerHTML = selectedItem
                newChannelOption.className = 'chatroomOption'
                document.getElementById('chatrooms-list').appendChild(newChannelOption)
                let chatroomMasterList = document.getElementsByClassName('chatroomOption')
                for(let i = 0; i < chatroomMasterList.length; i++){
                    let selectedRoom = chatroomMasterList[i].innerHTML 
                }

            }
        }
    }
}

onChildAdded('Jargon/chatrooms', loadAddedChannels)


function resetUpload(){
    document.getElementById('filesubmitlabel').style.display = "none"
    document.getElementById('filepickerlabel').style.display = "inline-block"
    document.getElementById('filepickerlabel').style.marginTop = "5px"
}

function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("choosefile").files;

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            
            var srcData = fileLoadedEvent.target.result;

            let text = document.getElementById('in').value
            
            push('Jargon/chatrooms/' + chatroomNumber + '/messages', {text: text, sender: userName, imageURL: srcData, timeStamp: checkTime()})
            
            document.getElementById('in').value = ""
        } 
        resetUpload()
        fileReader.readAsDataURL(fileToLoad);

    } else if (filesSelected.length <= 0) {
        let text = document.getElementById('in').value
        document.getElementById('in').value = ""
        if(text.includes("/")){
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
                //console.log(finalEmote)
                fetchEmote(finalEmote.toLowerCase())
            }
        } else {
            push('Jargon/chatrooms/' + chatroomNumber + '/messages', {text: text, sender: userName, timeStamp: checkTime()})
        }
    }
}

function saveEmote(){
    var filesSelected = document.getElementById("new-emote-file").files;

    var name = document.getElementById('new-emote-name').value

    let nameLower = name.toLowerCase()

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            
            var srcData = fileLoadedEvent.target.result;
            
            push('Jargon/emotes/static-images', {name: nameLower, imageURL: srcData})
            
            document.getElementById('new-emote-name').value = ""
            console.log("SAVED!")
            newMessage("New emote saved: "+ name, chatroomNumber)
        } 
        document.getElementById('new-emote-name').style.display = 'none'
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
                    push("Jargon/chatrooms/"+chatroomNumber+"/messages", {sender: currentUser, imageURL: selectedItem.imageURL})
                }
            } else if(typeof selectedItem === "string"){
                set("Jargon/emotes/static-images/"+(Object.keys(emoteList)[i]), null)
            }
        }
    }
}

window.fetchEmote = fetchEmote

document.getElementById('in').onkeypress = (event) => {
    if (event.key === "Enter") {
        encodeImageFileAsURL()
    }
}

document.getElementById("choosefile").oninput = () => {
    document.getElementById('filepickerlabel').style.display = "none"
    document.getElementById('filesubmitlabel').style.display = "inline-block"
    document.getElementById('filesubmitlabel').style.marginTop = "5px"
}

document.getElementById('new-emote-file').oninput = () => {
    document.getElementById('new-emote-name').style.display = "inline-block"
}

document.getElementById('new-emote-name').onkeypress = (event) => {
    if(event.key === "Enter"){
        saveEmote()
    }
}


document.getElementById('create-channel').onclick = () => {
    document.getElementById('create-channel').style.display = "none"
    document.getElementById('new-channel-name').style.display = "inline-block"
}

document.getElementById('new-channel-name').onkeypress = (event) => {
    if (event.key === "Enter"){
        //console.log(event.key)
        newChannelName = document.getElementById('new-channel-name').value


        set('Jargon/chatrooms/' + document.getElementById('new-channel-name').value + "/messages", "")
        document.getElementById('new-channel-name').style.display = 'none'
        document.getElementById('create-channel').style.display = "inline-block"
        let chatroomMasterList = document.getElementsByClassName('chatroomOption')
        for(let i = 0; i< chatroomMasterList.length;i++){
            let currentRoom = chatroomMasterList[i].innerHTML
            newMessage(userName+" has created a new channel: "+document.getElementById('new-channel-name').value, currentRoom)
        }
        document.getElementById('new-channel-name').value = ''
    }
}


document.getElementById('filesubmitlabel').onclick = encodeImageFileAsURL

document.getElementById('settings-container').onclick = () => {
    document.getElementById('literally-everything').style.display = "none"
    document.getElementById('settings-window').style.display = "block"
    let settingsOptions = document.getElementsByClassName('settings-option')
    for(let i=0; i < settingsOptions.length; i++){
        settingsOptions[i].style.display = "inline-block"
    }

}

document.getElementById('lightmode').onclick = () => {
    lightMode()
}

document.getElementById('darkmode').onclick = () => {
    darkMode()
}

document.getElementById('bluetext').onclick = () => {
    changeTextColor('blue')
}

document.getElementById('redtext').onclick = () => {
    changeTextColor('red')
}

document.getElementById('greentext').onclick = () => {
    changeTextColor('green')
}

document.getElementById('blacktext').onclick = () => {
    changeTextColor('black')
}

document.getElementById('back-button').onclick = () => {
    document.getElementById('literally-everything').style.display = "block"
    document.getElementById('settings-window').style.display = "none"
    let settingsOptions = document.getElementsByClassName('settings-option')
    for(let i=0; i < settingsOptions.length; i++){
        settingsOptions[i].style.display = "none"
    }

}


window.chatroomsEntered = chatroomsEntered

export {chatroomNumber, chatroomsEntered, subscribeToRoom, callback, newMessage, logOut}

export function modifyChatroomNuber(value) {chatroomNumber = value}