let strokeThick = 5;
let color = "black";
let mouseCoords = [];
let isDrawing = 0;
let mode = 'Drawing';
let answers =  [];
let boardNames = [];
let redBtn = document.getElementById("brush-red");
let blueBtn = document.getElementById("brush-blue");
let blackBtn = document.getElementById("brush-black");
let greenBtn = document.getElementById("brush-green");
let bigBtn = document.getElementById("brush-big");
let medBtn = document.getElementById("brush-med");
let smallBtn = document.getElementById("brush-sml");

function setup(){
    createCanvas(800, 600)
    background(255)

}

function draw(){
    stroke(color)
    strokeWeight(strokeThick)
    if (mouseIsPressed && isDrawing === 1){
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
    
}

function mouseReleased() { // get rid of point in array to break up lines
    mouseCoords = []
}

// Line color and stroke functions
function bigStroke(){
    strokeThick = 15;
    bigBtn.style.background = '#595950';
    bigBtn.style.color = 'white';
    medBtn.style.background = 'transparent';
    smallBtn.style.background = 'transparent';
    medBtn.style.color = 'black';
    smallBtn.style.color = 'black';
}

function medStroke(){
    strokeThick = 7;
    medBtn.style.background = '#595950';
    medBtn.style.color = 'white';
    bigBtn.style.background = 'transparent';
    smallBtn.style.background = 'transparent';
    bigBtn.style.color = 'black';
    smallBtn.style.color = 'black';
}

function smallStroke(){
    strokeThick = 3;
    smallBtn.style.background = '#595950';
    smallBtn.style.color = 'white';
    medBtn.style.background = 'transparent';
    bigBtn.style.background = 'transparent';
    medBtn.style.color = 'black';
    bigBtn.style.color = 'black';
}

function redStroke(){
    color = "red";
    redBtn.style.background = '#595950';
    redBtn.style.color = 'white';
    blackBtn.style.background = 'transparent';
    greenBtn.style.background = 'transparent ';
    blueBtn.style.background = 'transparent ';
    blackBtn.style.color = 'black';
    greenBtn.style.color = 'black ';
    blueBtn.style.color = 'black ';
}

function blueStroke(){
    color = "blue";
    blueBtn.style.background = '#595950';
    blueBtn.style.color = 'white';
    blackBtn.style.background = 'transparent';
    redBtn.style.background = 'transparent ';
    greenBtn.style.background = 'transparent ';
    blackBtn.style.color = 'black';
    redBtn.style.color = 'black ';
    greenBtn.style.color = 'black ';
}

function greenStroke(){
    color = "green";
    greenBtn.style.background = '#595950';
    greenBtn.style.color = 'white';
    blackBtn.style.background = 'transparent';
    redBtn.style.background = 'transparent ';
    blueBtn.style.background = 'transparent ';
    blackBtn.style.color = 'black';
    redBtn.style.color = 'black ';
    blueBtn.style.color = 'black ';
}

function blackStroke(){
    color = "black";
    blackBtn.style.background = '#595950';
    blackBtn.style.color = 'white';
    redBtn.style.background = 'transparent ';
    greenBtn.style.background = 'transparent';
    blueBtn.style.background = 'transparent';
    redBtn.style.color = 'black ';
    greenBtn.style.color = 'black';
    blueBtn.style.color = 'black';
}

//drawing buttons
document.getElementById('brush-big').onclick = bigStroke;
document.getElementById('brush-med').onclick = medStroke;
document.getElementById('brush-sml').onclick = smallStroke;
document.getElementById("brush-red").onclick = redStroke;
document.getElementById("brush-blue").onclick = blueStroke;
document.getElementById("brush-green").onclick = greenStroke;
document.getElementById("brush-black").onclick = blackStroke;




function saveBoard(boardName){
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.toBlob(function(blob) {
        boardName = document.createElement('img'),
            url = URL.createObjectURL(blob);
        boardName.setAttribute("class", "image")
        boardName.onload = function() {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url);
        };
        boardName.src = url;
        boardNames.push(boardName)
    });
    
}


function displayBoard(boardName){
    document.body.appendChild(boardName);
}

function displayAll(){
    console.log(boardNames)
    console.log(answers)
    var canvas = document.getElementsByTagName("canvas")[0];
    var pallete = document.getElementById("pallete");
    var counter = document.getElementById("counter-div");
    pallete.remove()
    canvas.remove()
    counter.remove()
    document.getElementById("prompt-div").innerHTML = "Here's how it went:";

    for (let i = 0; i < (answers.length); i++){
        let answer = document.createTextNode(answers[i]);
        console.log(i + answer)
        //answer.style.padding = '20px';
        document.body.appendChild(answer)
        let image = boardNames[i];
        if (image != null){
            document.body.appendChild(image)
        }
    }
}