import {chatroomsSubbedTo, chatroomNumber, encodeImageFileAsURL, modifyChatroomNuber, chatrooms} from './script.js'



console.log("IMPORTED CreateChatroomInHTML.js")

function createChatroomInHTML(chatroom){
    if (chatroom != undefined){
        const newDiv = document.createElement('div')
        newDiv.className = "chatroom"
        newDiv.id = chatroom
        const chatroomheader= document.createElement('div')
        chatroomheader.className = "chatroomheader"
        const title = document.createElement('div')
        title.innerHTML = chatroom
        title.style.flex = "1 0 auto"
        title.style.color = "white"
        title.style.textShadow = "6px 6px black"
        const chatoptions = document.createElement('div')
        chatoptions.className = "menucontainer"
        const menuicon = document.createElement('img')
        menuicon.src= "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-menu-512.png"
        menuicon.className = "ico"
        menuicon.id = "ico"+chatroom
        chatoptions.append(menuicon)
        chatroomheader.appendChild(title)
        chatroomheader.appendChild(chatoptions)
        const messagebox = document.createElement('div')
        messagebox.className = "chatbox"
        messagebox.id = "chatbox"+chatroom
        const input = document.createElement('input')
        input.className = 'in'
        input.id = "in"+chatroom
        const label = document.createElement('label')
        label.htmlFor = "choosefile"+chatroom
        label.id = 'filepickerlabel'+chatroom
        const imageInput = document.createElement('input')
        imageInput.type = "file"
        imageInput.className = "imageupload"
        imageInput.id = "choosefile"+chatroom
        label.innerHTML = "Upload Image"
        label.className = "imageuploadlabel"
        label.appendChild(imageInput)
        const filesumbit = document.createElement('div')
        filesumbit.id = "filesubmitlabel"+chatroom
        filesumbit.innerHTML = "Send Image"
        filesumbit.className = "imagesubmitbutton"
        newDiv.appendChild(chatroomheader)
        newDiv.appendChild(messagebox)
        newDiv.appendChild(input)
        newDiv.appendChild(label)
        newDiv.appendChild(imageInput)
        newDiv.appendChild(filesumbit)
        document.getElementsByClassName('chatrooms')[0].appendChild(newDiv)

        chatroomsSubbedTo[chatroom] = false

        createChatMenu(chatroom)

        initializeChatroom(chatroom)

    }
}

function initializeChatroom(chatroom){


        document.getElementById("chatname"+chatroom).onclick = (event) => {

            if(chatroomsSubbedTo[chatroom] === false){
                modifyChatroomNuber(chatroom)
                let room = chatrooms[chatroom]
                room.subscribe()
            } else if (chatroomsSubbedTo[chatroom] === true && chatroom === chatroomNumber){
                let room = chatrooms[chatroom]

                if(room.notifying === true){
                    console.log("Exception Thrown:")
                } else if (room.notifying === false){
                    room.unsubscribe()
                    //console.log("True",chatroom)
                    //click animations
                    document.getElementById("chatname"+chatroom).style.boxShadow = "none"
                }

            } else if (chatroom != chatroomNumber && chatroomsSubbedTo[chatroom] === true){
                let room = chatrooms[event.currentTarget.innerHTML]

                if(room.notifying === true){
                    console.log("Other Exception Thrown:")
                }else if (room.notifying === false){
                    room.unsubscribe()
                }
                
            }

        }

        document.getElementById(chatroom).onclick = () => { 
            if (!chatroomsSubbedTo[chatroom]){
                modifyChatroomNuber(chatroom)
                let room = chatrooms[chatroom]
                room.subscribe()
            }
        }

    
        document.getElementById("ico"+chatroom).onmousedown = () => {

            if (chatroomNumber === chatroom){
                //go to menu onclick
                document.getElementById("ico"+chatroom).onclick = () => {
                    console.log('click')
                    document.getElementById(chatroom).style.display = "none"
                    document.getElementById("menu"+chatroom).style.display = "flex"
                }
            } else {
                modifyChatroomNuber(chatroom)
            }
        
            //click animations
            document.getElementById("ico"+chatroom).style.borderRadius = "50%"
            document.getElementById("ico"+chatroom).style.background = "lightgrey"
    
            document.getElementById("ico"+chatroom).onmouseup = () => {
                document.getElementById("ico"+chatroom).style.background = "white"
            }
        }
    


    document.getElementById("in"+chatroom).onkeypress = (event) => {
        if(event.key === "Enter"){
            encodeImageFileAsURL()
        }
    }

    document.getElementById("filepickerlabel"+chatroom).onmousedown = () => {
        document.getElementById("filepickerlabel"+chatroom).style.background = "darkcyan"

        document.getElementById("filepickerlabel"+chatroom).onmouseup = () => {
            document.getElementById("filepickerlabel"+chatroom).style.background = "cyan"
        }
    }
    
    document.getElementById("choosefile"+chatroom).oninput = () => {
        document.getElementById('filepickerlabel'+chatroomNumber).style.display = "none"
        document.getElementById('filesubmitlabel'+chatroomNumber).style.display = "inline-block"

    }
    

    document.getElementById('filesubmitlabel'+chatroom).onmousedown = () => {
        document.getElementById("filesubmitlabel"+chatroom).onclick = () => {
            encodeImageFileAsURL()
        }

        document.getElementById('filesubmitlabel'+chatroom).style.background = "green"
        document.getElementById('filesubmitlabel'+chatroom).onmousedown = () => {
            document.getElementById('filesubmitlabel'+chatroom).style.background = "lightgreen"
        }
    }

}


function createChatMenu(chatroom){
    let menuHTML = 
`
<div class="menubackbutton">
    <u>
        Back
    </u>
</div>
<div class="chatroomheader" id="settingsheader#CHATNAME#">
    <div style="flex: 1 0 auto; color: black"> <u> Settings -- #CHATNAME# </u> </div>
</div>

<div class="settingsholder" id="settingsone">

    <div id="backgroundcolorsettings#CHATNAME#" class="backgroundcolorsettings"> 

        Background Color: 
        <div class="backgroundcolorscontainer">
        <div class="backgroundcolor" style="background: red;">Red</div>
        <div class="backgroundcolor" style="background: blue;">Blue</div>
        <div class="backgroundcolor" style="background: green;">Green</div>
        <div class="backgroundcolor" style="background: grey;">Grey</div>
        </div>

    </div>

    <div id="textcolorsettings#CHATNAME#" class="textcolorsettings">

        Chatbox Border Type:
        <div class="textcolorscontainer">
            <div class="bordertypecontainer">   
                <div class="bordertypesquare chatboxsetting">Square</div>
                <div class="bordertyperound chatboxsetting">Round</div>
            </div>
        </div>

    </div>
</div>

<div class="settingsholder" id="settingstwo">

    <div id="bordertypesettings#CHATNAME#" class="bordertypesettings">  
    
        Border Type:
        <div class="bordertypecontainer">   
            <div class="bordertypesquare">Square</div>
            <div class="bordertyperound">Round</div>
        </div>
    
    </div>

</div>
`

    console.log(chatroom)
    menuHTML = menuHTML.replaceAll("#CHATNAME#", chatroom)

    const menu = document.createElement('div')
    menu.id = 'menu'+chatroom
    menu.className = 'menu'
    menu.innerHTML = menuHTML

    document.getElementsByClassName('chatrooms')[0].appendChild(menu)

    initializeMenu(chatroom)
}


function initializeMenu(chatroom){


    for (let i = 0; i < document.getElementsByClassName('backgroundcolor').length; i++){
        
        document.getElementsByClassName('backgroundcolor')[i].style.background = document.getElementsByClassName('backgroundcolor')[i].innerHTML

        document.getElementsByClassName('backgroundcolor')[i].onmousedown = () => {

            //change bkgrnd color
            document.getElementsByClassName('backgroundcolor')[i].onclick = () => {
                let room = chatrooms[chatroomNumber]
                room.changeBackground(document.getElementsByClassName('backgroundcolor')[i].innerHTML)
            }

            //click animations
            if (document.getElementsByClassName('backgroundcolor')[i].innerHTML === "Red"){
                document.getElementsByClassName('backgroundcolor')[i].style.background = "rgb(170, 4, 4)"
            } else if (document.getElementsByClassName('backgroundcolor')[i].innerHTML === "Grey"){
                document.getElementsByClassName('backgroundcolor')[i].style.background = "rgb(95, 95, 95)"
            } else {
                document.getElementsByClassName('backgroundcolor')[i].style.background = ("dark"+document.getElementsByClassName('backgroundcolor')[i].innerHTML)
            }
            document.getElementsByClassName('backgroundcolor')[i].onmouseup = () => {
                document.getElementsByClassName('backgroundcolor')[i].style.background = document.getElementsByClassName('backgroundcolor')[i].innerHTML

            }

        }

    }
    
    for (let i = 0; i < document.getElementsByClassName('bordertypesquare').length; i++){

        document.getElementsByClassName('bordertypesquare')[i].onmousedown = () => {

            //chnage border
            document.getElementsByClassName('bordertypesquare')[i].onclick = () => {
                let room = chatrooms[chatroomNumber]
                room.changeBorder(0)
            }

            //click animations
            document.getElementsByClassName('bordertypesquare')[i].style.background = "rgb(95, 95, 95)"
            document.getElementsByClassName('bordertypesquare')[i].onmouseup = () => {
                document.getElementsByClassName('bordertypesquare')[i].style.background = "lightgrey"
            }
        }
    }

    for (let i = 0; i < document.getElementsByClassName('bordertyperound').length; i++){

        document.getElementsByClassName('bordertyperound')[i].onmousedown = () => {

            //change border
            document.getElementsByClassName('bordertyperound')[i].onclick = () => {
                let room = chatrooms[chatroomNumber]
                room.changeBorder(30)
            }

            //click animations
            document.getElementsByClassName('bordertyperound')[i].style.background = "rgb(95, 95, 95)"
            document.getElementsByClassName('bordertyperound')[i].onmouseup = () => {
                document.getElementsByClassName('bordertyperound')[i].style.background = "lightgrey"
            }
        }
    }

    for(let i = 0; i < document.getElementsByClassName("bordertyperound chatboxsetting").length; i++){
        document.getElementsByClassName('bordertyperound chatboxsetting')[i].onmousedown = () => {

            //change border
            document.getElementsByClassName('bordertyperound chatboxsetting')[i].onclick = () => {
                let room = chatrooms[chatroomNumber]
                room.changeChatboxBorder(30)
            }

            //click animations
            document.getElementsByClassName('bordertyperound chatboxsetting')[i].style.background = "rgb(95, 95, 95)"
            document.getElementsByClassName('bordertyperound chatboxsetting')[i].onmouseup = () => {
                document.getElementsByClassName('bordertyperound chatboxsetting')[i].style.background = "lightgrey"
            }
        }
    }

    for(let i = 0; i < document.getElementsByClassName("bordertypesquare chatboxsetting").length; i++){
        document.getElementsByClassName('bordertypesquare chatboxsetting')[i].onmousedown = () => {

            //change border
            document.getElementsByClassName('bordertypesquare chatboxsetting')[i].onclick = () => {
                let room = chatrooms[chatroomNumber]
                room.changeChatboxBorder(0)
            }

            //click animations
            document.getElementsByClassName('bordertypesquare chatboxsetting')[i].style.background = "rgb(95, 95, 95)"
            document.getElementsByClassName('bordertypesquare chatboxsetting')[i].onmouseup = () => {
                document.getElementsByClassName('bordertypesquare chatboxsetting')[i].style.background = "lightgrey"
            }
        }
    }

    for(let i = 0; i < document.getElementsByClassName('menubackbutton').length; i++){
        document.getElementsByClassName('menubackbutton')[i].onclick = () => {
            document.getElementById("menu"+chatroomNumber).style.display = "none"
            document.getElementById(chatroomNumber).style.display = "block"
        }
    }
}


export {createChatroomInHTML}