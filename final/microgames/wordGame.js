import {gameState, dictionary} from "./script.js"
import {set, push, onValue, onChildAdded} from "./firebase.js"
import {startDrawingGame} from "./drawingGame.js"
let wordList = []
let longestWord = ""

// game timer
function gameTimer(time) {
    let div = document.getElementById("timer")
    let timer = setInterval(() => {
        div.innerHTML = time
        time -= 1

        if (time < 0) {
            clearInterval(timer)
            div.innerHTML = ""
            document.getElementById("general-input").innerHTML = ""
            if (gameState.role === "host") {
                document.getElementById('timer').style.visibility = "hidden"
                document.getElementById("alert").innerHTML = "Time's up!"

                let nextButton = document.createElement("button")
                nextButton.innerHTML = "Next game"
                nextButton.onclick = () => {
                    document.getElementById('alert').innerHTML = ""
                    push(`/microgames/${gameState.gameInstance}/nextGame`, {started: true})
                    document.getElementById('leaderboard').innerHTML = ""
                    document.getElementById('next-button').innerHTML = ""
                    startDrawingGame()
                }
                document.getElementById("next-button").appendChild(nextButton)
            } else {
                document.getElementById('general-input').style.visibility = "hidden" 
                document.getElementById('timer').style.visibility = "hidden"
                console.log("running")
                onChildAdded(`/microgames/${gameState.gameInstance}/nextGame`, () => startDrawingGame())
            }
        }
    }, 1000)
}

// create container divs, each with a name and score div
function updateLeaderboard() {
    for (let i = 0; i < gameState.players.length; i++) {
        var newContainerDiv = document.createElement("div")
        newContainerDiv.classList.add('score-container-div')

        var newNameDiv = document.createElement("div")
        newNameDiv.classList.add("leaderboard-name")

        var newScoreDiv = document.createElement("div")
        newScoreDiv.id = `score-div${i}`
        newScoreDiv.classList.add("score-div")
        
        newScoreDiv.classList.add()
        newScoreDiv.innerHTML = "0"
        newNameDiv.innerHTML = gameState.players[i]
        newContainerDiv.appendChild(newNameDiv)
        newContainerDiv.appendChild(newScoreDiv)
        document.getElementById("leaderboard").appendChild(newContainerDiv)
    }
}


function wordHostCallback(snapshot) {
    let player = snapshot.val().name
    let word = snapshot.val().word
    console.log(gameState.players.findIndex(element => player === element))

    let div = document.getElementById(`score-div${gameState.players.findIndex(element => player === element)}`) // janky
    div.innerHTML = word.length 
    gameState.scores[player] = word.length
}

function checkWord(word) {
    word = word.toLowerCase()
    if (dictionary.check(word) && word.length > longestWord.length) {
        return true
    } else {
        return false
    }
}

function submitWord(word) {
    longestWord = word
    wordList.push(word)
    push(`/microgames/${gameState.gameInstance}/words`, {name: gameState.name, word: word})
}

function startWordGame() {
    gameTimer(40) 
    document.getElementById('timer').style.visibility = "visible"
    if (gameState.role === "host") {
        updateLeaderboard()
        onChildAdded(`microgames/${gameState.gameInstance}/words`, wordHostCallback)

    } else if (gameState.role === "client") {
        document.getElementById('general-input').style.visibility = "visible" 
        let wordInput = document.createElement("input")
        wordInput.placeholder = "Type words here!"
        wordInput.addEventListener('keydown', e => {
            if (e.key === "Enter") {
                if (checkWord(wordInput.value)) {
                    submitWord(wordInput.value)
                    console.log("working")
                    wordInput.value = ""
                }
            }
        })
        document.getElementById("general-input").appendChild(wordInput)

    }
}
export {startWordGame, gameTimer}