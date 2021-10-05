console.log("IMPORTED")


let yP = document.getElementById('yourprompt')

let p = document.getElementById('prompt')

let g = document.getElementById('yourguess')

g.style.display = "none"

function formatTime(time) {
    let minutes = Math.floor(time / 60)

    let seconds = time%60

    if (seconds < 10) {
        return minutes + ":" + "0" + seconds

    } else {
        return minutes + ":" + seconds
    }
 
}


let time = 10

var i = 0

let hasDrawn = 0

let TIME_LIMIT = time

let timerElement = document.getElementById("timer")
let timePassed = 0
let timeLeft = TIME_LIMIT

let paths = []
let currentPath = []
let imageList = []

let guessList = []
let saved = false

let canvas = document.getElementById('canvas')

let listElement = document.getElementById("prompt")

let promptsList = [

    "Draw a llama surfing",
    "Draw a fish swimming in something other than water",
    "Combine two animals to create a new one",
    "Draw a shark eating a cupcake",
    "Draw a crab at a birthday party",
    "Draw a seahorse in a blizzard",
    "Draw a dinosaur crying",
    "Draw an animal with arms for legs and legs for arms",
    "Draw a pug on a treadmill",
    "Draw a horse throwing a horseshoe",
    "Draw a shark waterskiing",
    "Draw a walrus in a beach chair",
    "Draw a circus elephant standing on a ball",
    "Draw a koala bear sitting on a trash can",
    "Draw a lizard putting on lipstick",
    "Draw a squirrel roasting a marshmallow",
    "Draw an octopus with spoons for legs",
    "Draw a mouse riding a motorcycle",
    "Draw a flamingo doing ballet",
    "Draw a butterfly eating a steak",
    "Draw a cat chasing a dog",
    "Draw a lobster dancing",
    "Draw a cat playing a sport",
    "Draw a chicken skydiving"
]

let x = promptsList.length
let num = getRandomRange(0,x)

let prompt = promptsList[num]

function startTimer() {
    timeInterval = setInterval(() => {
        timePassed += 1
        timeLeft = TIME_LIMIT - timePassed

        timerElement.innerHTML = formatTime(timeLeft)

        if (timeLeft === 0 && hasDrawn%2 === 0) {
            console.log(hasDrawn)
            saveBoard()
            clearInterval(timeInterval)
            reGuess()
        } else if (timeLeft === 0 && hasDrawn%2 === 1) {
            console.log(hasDrawn)
            saveInput()
            clearInterval(timeInterval)
            document.getElementById('input').value = ""
            reDraw()
        }

        if (timeLeft === 0 && hasDrawn === 6) {
            console.log(hasDrawn)
            console.log("DONE")
            clearInterval(timeInterval)
            quit()
        }
    }, 1000)
}


function reGuess() {

    hasDrawn++
    p.style.display = "none"
    yP.style.display = "none"
    g.style.display = "block"
    canvas.style.display = "flex"
    document.getElementById("defaultCanvas0").style.display = "none"
    time = 5
    TIME_LIMIT = time
    timePassed = -1
    startTimer()
    done()
}

function reDraw() {

    if (imageList.length >= i){
        canvas.removeChild(canvas.firstChild)
        canvas.style.display = "none"
        hasDrawn++
        p.style.display = "flex"
        yP.style.display = "flex"
        g.style.display = "none"
        clearBoard()
        document.getElementById('defaultCanvas0').style.display = "block"
        time = 10
        TIME_LIMIT = time
        timePassed = -1
        startTimer()
    } else {
        setTimeout(reDraw, 500)
    }
}

function saveBoard() {

    document.getElementById('defaultCanvas0').style.display = "block"
    var board = document.getElementById('defaultCanvas0')

    board.toBlob(function(blob) {
        var newImg = document.createElement('img')
            url = URL.createObjectURL(blob)

        newImg.onload = function() {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url)
        }

        newImg.src = url

        imageList.push(newImg)


    })

    //document.getElementById('input').style.display = "block"
    
    //document.getElementById('defaultCanvas0').style.display = "block"
    //document.getElementById('input').style.display = "none"
    // move save function to after imput function , multiple drawings puh in array

}

function saveInput() {
    saved = true
    let g  = imageList.length - 1
    var savedInput = document.getElementById('input').value

    guessList.push(savedInput)

    prompt = guessList[g]
    drawPrompt()


}


function done(){

    if (imageList.length > i){
        let a = imageList[i]
        canvas.appendChild(a)
        i++

    } else {
        setTimeout(done, 300)
    }
            //var newDiv = document.createElement('div')
            //newDiv.innerHTML = imageList[i]
            //document.body.appendChild(newDiv)
}



function getRandomRange(min, max) {
    let i = Math.random() * (max - min) + min;
    return parseInt(i)
}

function drawPrompt() {
    if (hasDrawn === 0) {
        listElement.innerHTML = prompt
    } else {
        if (saved === true) {
            listElement.innerHTML = prompt
        } else {
            setTimeout(drawPrompt,500)
        }
    }
}

function clearBoard() {
    background(255)
    paths = []
}

function quit()
{
   throw new Error('This is not an error. This is just to abort javascript');
}

timerElement.innerHTML = formatTime(timeLeft)

drawPrompt()

startTimer()

