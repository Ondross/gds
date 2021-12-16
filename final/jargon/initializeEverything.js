import {set, push, onValue, onChildAdded, get} from "./firebase.js"

import {chatroomNumber, changeTextColor, currentUser, findCurrentColor, chatrooms, saveEmote} from './script.js'

import {lightMode, darkMode} from './commands.js'

console.log("IMPORTED initializeEverything.js")


for(let i = 0; i < document.getElementsByClassName('menubackbutton').length; i++){
    document.getElementsByClassName('menubackbutton')[i].onclick = () => {
        document.getElementById("menu"+chatroomNumber).style.display = "none"
        document.getElementById(chatroomNumber).style.display = "block"
    }
}

document.getElementsByClassName('newchannelin')[0].onkeypress = (event) => {
    if (event.key === "Enter"){

        set('Jargon/chatrooms/' + document.getElementsByClassName('newchannelin')[0].value + "/messages", "")
        document.getElementsByClassName('newchannelin')[0].style.display = 'none'
        
        sendToAllChatrooms(currentUser+" has created a new channel: "+document.getElementsByClassName('newchannelin')[0].value)
        
        document.getElementsByClassName('newchannelin')[0].value = ''
    }
}

document.getElementsByClassName('newemotecontainer')[0].onmousedown = () => {
    if(document.getElementsByClassName('newemotename')[0].style.display === "inline-block"){
        document.getElementsByClassName('newemotename')[0].style.display = "none"
    }

    document.getElementsByClassName('newemotecontainer')[0].style.background = "rgb(106, 162, 184)"
    document.getElementsByClassName('newemotecontainer')[0].onmouseup = () => {
        document.getElementsByClassName('newemotecontainer')[0].style.background = "skyblue"
    }
}

document.getElementsByClassName('newemotefile')[0].oninput = () => {
    document.getElementsByClassName('newemotename')[0].style.display = "inline-block"
}


document.getElementsByClassName('newemotename')[0].onkeypress = (event) => {
    if(event.key === "Enter"){
        saveEmote()
    }
}

document.getElementsByClassName('createchannel')[0].onmousedown = () => {
    //on click do xyz
    document.getElementsByClassName('createchannel')[0].onclick = (event) => {
        document.getElementsByClassName('newchannelin')[0].style.display = "inline-block"
    }

    //click animations
    document.getElementsByClassName('createchannel')[0].style.background = "rgb(106, 162, 184)"
    document.getElementsByClassName('createchannel')[0].onmouseup = () => {
        document.getElementsByClassName('createchannel')[0].style.background = "skyblue"
    }

}



document.getElementsByClassName('settingsbutton')[0].onclick = () => {
    console.log("Settings")
    document.getElementById('everything').style.display = "none"
    document.getElementById('everythingelse').style.display = "none"
    document.getElementById('settingswindow').style.display = "block"
}

document.getElementsByClassName('backbutton')[0].onclick = () => {
    document.getElementById('everything').style.display = "flex"
    document.getElementById('everythingelse').style.display = "inline-block"
    document.getElementById('settingswindow').style.display = "none"
}

document.getElementsByClassName('switch-input')[0].onclick = () => {
    if(document.getElementsByClassName('switch-input')[0].checked === false){
        document.getElementsByClassName('switch-input')[1].checked = true
        lightMode()
    } else {
        document.getElementsByClassName('switch-input')[1].checked = false
        darkMode()
    }
}

document.getElementsByClassName('switch-input')[1].onclick = () => {
    if(document.getElementsByClassName('switch-input')[1].checked === false){
        document.getElementsByClassName('switch-input')[0].checked = true
        darkMode()
    } else {
        document.getElementsByClassName('switch-input')[0].checked = false
        lightMode()
    }
}

for(let i = 0; i < document.getElementsByClassName('textcoloroption').length; i++){
    document.getElementsByClassName('textcoloroption')[i].style.color = document.getElementsByClassName('textcoloroption')[i].innerHTML

    document.getElementsByClassName('textcoloroption')[i].onclick = () => {
        changeTextColor(document.getElementsByClassName('textcoloroption')[i].innerHTML)
    }
}

