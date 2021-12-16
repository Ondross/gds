import {gameState} from "./script.js"
import {set, push, onValue, onChildAdded} from "./firebase.js"
let mouseCoords = []
let isDrawing
let xPos
let yPos

// I wish I had broken this down into more functions, it pretty much runs the whole game loop
function gameTimer(time) {
    let div = document.getElementById("timer")
    let timer = setInterval(( ) => {
        div.innerHTML = time
        time -= 1

        if (time < 0) {
            clearInterval(timer)
            div.innerHTML = ""
            document.getElementById("general-input").innerHTML = ""
            document.getElementById('timer').remove()

            if (gameState.role === "host") {
                document.getElementById('prompt').innerHTML = ""
                push(`/microgames/${gameState.gameInstance}/playerList`, {players: gameState.players})
                
                let nextButton = document.createElement("button")
                nextButton.innerHTML = "Done voting"
                nextButton.onclick = () => {
                    finishGame()
                    document.querySelectorAll('.picture').forEach(e => e.remove())
                    nextButton.remove()
                }

                // take images and display them with corresponding names
                onChildAdded(`/microgames/${gameState.gameInstance}/pics`, snapshot => {
                    let imageData = snapshot.val().imageData
                    let name = snapshot.val().name
                    let image = base64ToImage(imageData)
                    let pictureContainerDiv = document.createElement('div')
                    let nameContainerDiv = document.createElement('div')

                    image.style.width = 300
                    pictureContainerDiv.appendChild(nameContainerDiv)
                    pictureContainerDiv.appendChild(image)
                    nameContainerDiv.innerHTML = name
                    document.body.appendChild(pictureContainerDiv)
                    pictureContainerDiv.classList.add('picture')
                })
                document.getElementById("next-button").appendChild(nextButton)
                onChildAdded(`/microgames/${gameState.gameInstance}/scoring`, voteCallback)

            } else if (gameState.role === "client") {
                // remove canvas, vote
                saveDrawing()
                document.getElementsByTagName('canvas')[0].remove()
                takeVote()
            }
        }
    }, 1000)
}

// can't figure out how to make canvas load anywhere other than window.setup
window.setup = () => {
    createCanvas(400, 400) 
    stroke(randColor(), randColor(), randColor()) // random colored pens to differentiate players
    strokeWeight(4)
}

function startDrawingGame() {
    // create canvas and pen tool
    gameTimer(20)
    document.getElementById('timer').style.visibility = "visible"

    if (gameState.role === "client") {
        let draw = setInterval(() => {
            if (mouseIsPressed) {
                xPos = mouseX;
                yPos = mouseY;
                if (mouseCoords.length == 2){
                    line(mouseX, mouseY, mouseCoords[0], mouseCoords[1])
                }
                mouseCoords.pop();
                mouseCoords.pop();
                mouseCoords.push(xPos);
                mouseCoords.push(yPos);
            }
            if (!mouseIsPressed) {
                if (mouseCoords !== []) {
                    mouseCoords = []
                }
            }    
        }, 1)

    } else if (gameState.role === "host") {
        createPrompt()
    }
}

function saveDrawing () {
    // converts to base64 and sends to firebase
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.toBlob(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onload = () => {
            let base64data = reader.result;                
            push(`/microgames/${gameState.gameInstance}/pics`, {name: gameState.name, imageData: base64data})
        }   
    })
}

function base64ToImage(base64data) {
    let image = document.createElement('img')
    image.src = base64data
    image.style.width = '100%'
    return image
}

function createPrompt() {
    // optimally, the players would each enter an adjective and noun and the prompt would be created from those
    // but I didn't have time
    let adjectives = ["suspicious", "lazy", "southern", "impolite", "cool", 
                      "handsome", "proud", "unusual",  "goofy", "fancy",
                      "secretive", "mysterious", "fierce", "tired", "angry",
                      "curious", "grumpy", "rambunctious", "nervous", "clumsy"]

    let nouns = ["frog", "walrus", "bull", "squirrel", "horse", 
                 "alligator", "snake", "bunny", "whale", "otter", 
                 "sheep", "gorilla", "parrot", "owl", "wolf",
                 "lion", "camel", "platypus", "hippo", "seal"]  
        
    let randAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
    let randNoun = nouns[Math.floor(Math.random() * nouns.length)]
    document.getElementById('prompt').innerHTML = `Draw a/an ${randAdj} ${randNoun}!`

}

function randColor() {
    return Math.floor(Math.random() * 256)
}

function takeVote() {
    document.getElementById('vote').style.visibility = "visible"
    onChildAdded(`microgames/${gameState.gameInstance}/playerList`, snapshot => {
        let players = snapshot.val().players
        let drawingScore
        document.getElementById('prompt').innerHTML = "Who did it best?"
        for (const name of players) {
            let voteButton = document.createElement('button')
            voteButton.innerHTML = name
            if (players.length <= 2) {
                drawingScore = 5
            } else if (players.length === 3) {
                drawingScore = 3
            } else {
                drawingScore = 2
            }

            voteButton.onclick = () => {  
                push(`/microgames/${gameState.gameInstance}/scoring`, {name: name, drawingScore: drawingScore})
                document.getElementById('vote').remove()
                document.getElementById('prompt').remove()
            }
            voteButton.classList.add("vote-button")
            document.getElementById('vote').appendChild(voteButton)
        }
    })
}

function voteCallback(snapshot) {
    let name = snapshot.val().name
    let drawingScore = snapshot.val().drawingScore
    if (typeof gameState.scores[name] !== "number") {
        gameState.scores[name] = 0
    }
    if (typeof gameState.votes[name] !== "number") {
        gameState.votes[name] = 0
    }

    console.log(typeof drawingScore)
    gameState.scores[name] += drawingScore
    gameState.votes[name] += 1
}

function finishGame() {
    document.getElementById('vote').style.visibility = "hidden"
    if (gameState.role === "host") {
        for (const name of gameState.players) {
            console.log(name)
            var newContainerDiv = document.createElement("div")
            newContainerDiv.classList.add('score-container-div')
    
            var newNameDiv = document.createElement("div")
            newNameDiv.classList.add("leaderboard-name")
    
            var newScoreDiv = document.createElement("div")
            newScoreDiv.classList.add("score-div")
            
            newScoreDiv.classList.add()
            newScoreDiv.innerHTML = gameState.scores[name]
            newNameDiv.innerHTML = name
            newContainerDiv.appendChild(newNameDiv)
            newContainerDiv.appendChild(newScoreDiv)
            document.getElementById("leaderboard").appendChild(newContainerDiv)
        }
        recap()
    } else {
        document.body.innerHTML = ""
    }
}

function recap() {
    let maxScore = 0
    let maxVote  = 0
    let maxScorePlayer
    let maxVotePlayer
    for (const name of gameState.players) {
        if (gameState.scores[name] > maxScore) {
            maxScore = gameState.scores[name]
            maxScorePlayer = name
        }
        if (typeof gameState.votes[name] !== "undefined" && gameState.votes[name] > maxVote) {
            maxVote = gameState.votes[name]
            maxVotePlayer = name
        }
    }
    if (maxScorePlayer === maxVotePlayer) {
        document.getElementById("recap").innerHTML = `The overall winner is ${maxScorePlayer} with a score of ${maxScore}! They also had the best drawing with ${maxVote} vote(s).`
    } else {
        document.getElementById('recap').innerHTML = `The overall winner is ${maxScorePlayer} with a score of ${maxScore}, but the best drawing was by ${maxVotePlayer}, with ${maxVote} vote(s)!`
    }
}

export {startDrawingGame}