import {set, push, onValue, onChildAdded} from "./firebase.js"
import {startWordGame} from "./wordGame.js"
import {startDrawingGame} from "./drawingGame.js"

// object with variables to be passed between files
let gameState = {
    name: "",
    players: [],
    gameInstance: "",
    role: "",
    scores: { },
    votes: { }
}
let affData
let wordsData

// otherwise elements are visible initially (there's def a better way to do this...)
document.getElementById('general-input').style.visibility = "hidden" 
document.getElementById('player-list').style.visibility = "hidden"
document.getElementById('timer').style.visibility = "hidden"
document.getElementById('vote').style.visibility = "hidden"

// initialize dictionary 
async function fetchData() {
    affData = await fetch('./dictionaries/en_US/en_US.aff')
    wordsData = await fetch('./dictionaries/en_US/en_US.dic')
}
fetchData()
let dictionary = new Typo("en_US", affData, wordsData)

// callback functions
function newPlayerCallback(snapshot) {
    snapshot = JSON.stringify(snapshot)
    snapshot = snapshot.replaceAll('"', '')
    gameState.players.push(snapshot)
    // TODO: make this div instead?
    let container = document.createElement("div")
    container.innerHTML = snapshot
    container.classList.add('name-div')
    document.getElementById('player-list').appendChild(container)
}

function gameStartCallback(snapshot) {
    if (snapshot.val().status === "started") {
        startWordGame()
    }
}

function getName() {
    document.getElementById('game-setup').innerHTML = ""
    let nameBox = document.createElement('input')
    nameBox.placeholder = "Enter name"
    let enterButton = document.createElement('button')
    enterButton.innerHTML = "Submit name"
    enterButton.onclick = () => {
        gameState.name = nameBox.value
        push(`microgames/${gameState.gameInstance}/players`, gameState.name)
        document.getElementById('game-setup').innerHTML = ""
    }
    document.getElementById('game-setup').appendChild(nameBox)
    document.getElementById('game-setup').appendChild(enterButton)
}

// initial page setup
let hostButton = document.createElement('button')
hostButton.innerHTML = "Host"
let clientButton = document.createElement('button')
clientButton.innerHTML = "Player"


// host setup
hostButton.onclick = () => {
    document.getElementById('player-list').style.visibility = "visible"
    document.getElementById('start-buttons').innerHTML = ""
    gameState.role = "host"
    gameState.gameInstance = Math.floor(Math.random() * 9999) + 1000
    document.getElementById("game-code").innerHTML = `Your game code is ${gameState.gameInstance}`
    onChildAdded(`/microgames/${gameState.gameInstance}/players`, newPlayerCallback)

    let startButton = document.createElement('button')
    startButton.innerHTML = "Start game!"

    // start button
    startButton.onclick = () => {
        set(`/microgames/${gameState.gameInstance}/status`, {status: "started"})
        document.getElementById('game-setup').innerHTML = ""
        startButton.remove()
        startWordGame()
    }
    document.getElementById('host-start').appendChild(startButton)
}

// client setup
clientButton.onclick = () => {
    document.getElementById('player-list').remove()
    document.getElementById('start-buttons').innerHTML = ""
    gameState.role = "client"
    let enterButton = document.createElement('button')
    let instanceBox = document.createElement('input')
    instanceBox.placeholder = "Enter game code"

    enterButton.innerHTML = "Join game!"
    enterButton.onclick = () => { 
        gameState.gameInstance = instanceBox.value
        getName()
        onValue(`/microgames/${gameState.gameInstance}/status`, gameStartCallback)
    }

    document.getElementById('game-setup').appendChild(instanceBox)
    document.getElementById('game-setup').appendChild(enterButton)
}

document.getElementById('start-buttons').appendChild(hostButton)
document.getElementById('start-buttons').appendChild(clientButton)

export {gameState, dictionary}
window.gameState = gameState