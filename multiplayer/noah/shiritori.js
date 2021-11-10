import {set, push, onValue, onChildAdded} from "./firebase.js"

// initialize variables and load dictionary
let isPlayerOne
let affData
let wordsData
let oppWords = []
let playerWords = []
let oppScore = 0
let gameInstance = Math.floor(Math.random() * 9000 + 1000)
console.log(gameInstance)

async function fetchData() {
     affData = await fetch('/dictionaries/en_US/en_US.aff')
     wordsData = await fetch('/dictionaries/en_US/en_US.dic')
}

fetchData()
let dictionary = new Typo("en_US", affData, wordsData)

// checks that word is real and meets basic game rules in a very clunky manner
function spellcheck(word) { 
    if (word.indexOf(" ") >= 0 || !dictionary.check(word)) {
        return false
    } else if (oppWords[0] === undefined) {
        return true
    } else if (word.charAt(0) !== oppWords[0].charAt(oppWords[0].length - 1)) {
        return false
    } else if (oppWords.includes(word) || playerWords.includes(word)) {
        return false
    } else {
        return true
    }
}

// runs game timer (duh) and displays score once game ends
function gameCountdown(time) {
    let timer = setInterval(() => {
        document.getElementById('game-timer').innerHTML = time;
        time -= 1;

        if (time < 0) {
             clearInterval(timer);
             let finalScore = parseInt(document.getElementById("player-score").innerHTML)
             document.getElementById('game-timer').innerHTML = "";
             document.getElementById('gameplay-area').innerHTML = ""

             if (finalScore > oppScore) { // TODO: fix
                document.getElementById('gameplay-area').innerHTML = `You won! Your score was ${finalScore}, and your opponent's was ${oppScore}.`
             } else {
                document.getElementById('gameplay-area').innerHTML = `You lost. Your score was ${finalScore} and your opponent's was ${oppScore}.`
             }
        }
    }, 1000);
}


function getWordScore(word) {
    let score = word.length + (document.getElementById('player-timer').innerHTML - 3)
    return parseInt(score)
}


function getInput() { 

    // variables for divs, word timer, etc
    let inputBox = document.createElement("input") 
    let playerTimer = document.getElementById('player-timer')
    let playerScore = document.getElementById('player-score')
    let errorDiv = document.getElementById('error')
    inputBox.setAttribute('type', 'text')
    playerTimer.innerHTML = 5 
    document.getElementById('input').appendChild(inputBox)

    let wordTimer = setInterval(() => { 
        playerTimer.innerHTML -= 1
    }, 1000)

    // read for enter key (to actually submit the word)
    inputBox.addEventListener('keydown', (e) => { 
        if (e.key === "Enter") { 
            let userInput = inputBox.value

            if (!spellcheck(userInput)) {
                errorDiv.innerHTML = "Please enter a valid word" 
            } else {
                errorDiv.innerHTML = ""

                if (playerScore.innerHTML === "") { 
                    playerScore.innerHTML = 0
                }

                // get word info, push to firebase, add to user's played words
                playerScore.innerHTML = parseInt(playerScore.innerHTML) + getWordScore(userInput)
                playerWords.push(userInput)
                
                push(`/shiritori/${gameInstance}/words`, {
                    word: userInput,
                    score: getWordScore(userInput)
                })

                // reset input area
                inputBox.value = "" 
                clearInterval(wordTimer)
                playerTimer.innerHTML = ""

                if (isPlayerOne) {
                    document.getElementById('input').innerHTML = "Please wait for your opponent"
                    isPlayerOne = false
                }
            }
        }
    })

}



set("/shiritori/", {})

function startGame() {
    gameCountdown(90, 'game-timer') // game length
    startButton.remove()
    instanceBox.remove()
    document.getElementById('game-code').innerHTML = ""
    onChildAdded(`/shiritori/${gameInstance}/words`, wordCallback)
}

// game loop below (mostly)

let startButton = document.createElement("button")
let instanceBox = document.createElement("input")
startButton.innerHTML = "Start!"

startButton.onclick = () => {
    gameInstance = instanceBox.value
    isPlayerOne = true 
    set(`/shiritori/${gameInstance}/status`, {status: 'started'})
    getInput()
    startGame()
}

document.getElementById('input').appendChild(instanceBox)
document.getElementById('input').appendChild(startButton)
document.getElementById('game-code').innerHTML = `Your game code is: ${gameInstance}`


// callback functions
function gameStartCallback(snapshot) {
    if (snapshot.val() && snapshot.val().status === "started") {
        startGame()
        document.getElementById('input').innerHTML = "Please wait for your opponent"
    }
}

function wordCallback(snapshot) {
    let newWord = snapshot.val().word
    let newScore = snapshot.val().score
    let display = document.getElementById('display')

    if (!isPlayerOne) {
        oppScore += newScore
        isPlayerOne = true
        oppWords.unshift(newWord)
        document.getElementById('input').innerHTML = ""


        let newWordDiv = document.createElement("div")
        newWordDiv.className = "word"

        let newScoreDiv = document.createElement("div")
        newScoreDiv.className = "score"

        let container = document.createElement("div")
        container.className = "container"

        display.appendChild(container)
        container.appendChild(newWordDiv)
        container.appendChild(newScoreDiv)


        newWordDiv.innerHTML = newWord
        newScoreDiv.innerHTML = newScore

        getInput()
    } else {
        isPlayerOne = false
        document.getElementById('input').innerHTML = "Please wait for your opponent"
    }

}


onValue(`/shiritori/${gameInstance}/status`, gameStartCallback)


