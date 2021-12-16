let x = 100
let y = 100
let r
let g
let b
let s
let randx
let randy
let randdiam
let timer = 3
let youWon = false
let youLose = false
let mode = 0

function updateMode(){
    mode = mode + 1
}

function decreaseMode(){
    mode = mode - 1
}

function initialize(){
    randdiam = random(40, 70)

    r = Math.random() * 255
    g = Math.random() * 255
    b = Math.random() * 255

    randx = Math.random() * 1200
    randy = Math.random() * 575
}

function setup() {
    createCanvas(1200, 575)
    initialize()
}



function draw() {
    
    if(mode == 0){
        background(0)
        fill(255, 0, 0)
        textSize(100)
        
        fill(r, g, b)
        circle(randx, randy, randdiam)

    

        if (frameCount % 60 == 0 && timer > 0) { 
            timer --
        }
        const pixel = get(x, y)
        if (timer == 0) {
            if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0) {
                youLose = true 
            }else {
                youWon = true 
            }
        }
    } else if(mode == 1){
        // background('red')
        // let s = createButton('retry')
        // s.position(1125, 300)
        // s.mousePressed(decreaseMode)

        fill('black')
        text("Better Luck Next Time :)", 100, 300)
    }
console.log(mode)
    fill('red')
    circle(x, y, 25)

    console.log(mode)
    if(youLose == true){
        updateMode()
    }

    function repeat(){
        youWon = false
        timer = 3
        initialize()     
    }

    if (youWon == true){
        repeat()
    }

    text(timer, 1150, 200)


    if (keyIsDown(LEFT_ARROW)) {
    x = x - 5
    }
    if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5
    }
    if (keyIsDown(UP_ARROW)) {
    y = y - 5
    }
    if (keyIsDown(DOWN_ARROW)) {
    y = y + 5
    }
}