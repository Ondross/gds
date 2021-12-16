function setup(){
    createCanvas(1400, 620)
    textSize(45)
    fill(0, 0, 0)
    text("Turn each blue square white by touching it before time runs out", 0, 200)
    text("destroy the green enemies before they become large and purple", 0, 300)
    text("press spacebar to start", 0, 400)
}

let createLazer = false

let enemyTimeDecrease = 0

let numCheckpointsGotten = 0

let hitCheckpoint = false

let healthbar = 1000

let gameStarted = false

let running = false

let score = 0

let numEnemies = 12

let secondsTillDeath = 4

let date = Date.now()

document.addEventListener('keyup', function(e){
    if(e.keyCode == 32){
        running = true
        gameStarted = true
        date = Date.now()
        enemyTimeDecrease = 0
        secondsTillDeath = 0
        
    }
})

class Checkpoint{
    constructor(){
        this.xPosition = Math.random() * 1350
        this.yPosition = Math.random() * 570
    }
}

let checkpoint = new Checkpoint()

let checkpoints = []

checkpoints.push(checkpoint)

class Enemy{
    constructor(size){
        this.size = size
        this.xPosition = Math.random() * 1400
        this.yPosition = Math.random() * 620
        this.speed = 3
        this.colorGradient = 255
        this.timeAlive = 0
        this.enemyXVelocity = 2
        this.enemyYVelocity = -2
        this.sizeBoundary = 0
    }

    update() {
        this.xPosition += this.enemyXVelocity
        this.yPosition += this.enemyYVelocity

        if(this.timeAlive > 6 && this.sizeBoundary < 5){
            fill(255, 255, 0)
            this.size += 5
            this.sizeBoundary++
            //console.log("increasing size")
        } else {
            fill(255 - this.colorGradient, this.colorGradient, 255 - this.colorGradient)
        }

        circle(this.xPosition, this.yPosition, this.size)
    }
}

class Lazer{
    constructor(){
        this.width = 30
        this.height = 30
        this.xPosition = null
        this.yPosition = null
        this.xSpeed = 0
        this.ySpeed = 0
    }

    updateLazer(){
        this.xPosition += this.xSpeed
        this.yPosition += this.ySpeed
    }
}

let lazers = []

document.addEventListener('keyup', function(e){
    if(e.keyCode == 37){
        
        let lazer = new Lazer()
        lazer.xPosition = xPosition
        lazer.yPosition = yPosition

        lazer.xSpeed = -30
        lazer.width = 50
        lazer.height = 10

        lazers.push(lazer)
        delete lazer
    }else if(e.keyCode == 39){
        
        let lazer = new Lazer()
        lazer.xPosition = xPosition
        lazer.yPosition = yPosition

        lazer.xSpeed = 30
        lazer.width = 50
        lazer.height = 10

        lazers.push(lazer)
        delete lazer
    }else if(e.keyCode == 38){
        
        let lazer = new Lazer()
        lazer.xPosition = xPosition
        lazer.yPosition = yPosition

        lazer.ySpeed = -30
        lazer.width = 10
        lazer.height = 50

        lazers.push(lazer)
        delete lazer
    }else if(e.keyCode == 40){ 
        
        let lazer = new Lazer()
        lazer.xPosition = xPosition
        lazer.yPosition = yPosition

        lazer.ySpeed = 30
        lazer.width = 10
        lazer.height = 50

        lazers.push(lazer)
        delete lazer
    }
})

// function sleep(milliseconds){
//     let date = Date.now()
//     let currentDate = Date.now()
//     while(currentDate - date < milliseconds){
//         currentDate = Date.now()
//     }
// }

let xPosition = 700
let yPosition = 350

let xVelocity = 0
let yVelocity = 0

document.addEventListener('keyup', function(s){
    if(s.keyCode == 65 || s.keyCode == 68 ){
        xVelocity = 0
    }
    if(s.keyCode == 87 || s.keyCode == 83){
        yVelocity = 0
    }
})

document.addEventListener('keyup', function(l){
    if(l.keyCode == 32){
        createLazer = true
    }
})

document.addEventListener('keydown', function(e){
    if (e.repeat) {
        return
    }
    switch(e.keyCode){
        case 65:
            // console.log("a key pressed")
            // console.log("----------------")
            xVelocity += -10
            break
        case 87:
            // console.log("w key pressed")
            // console.log("----------------")
            yVelocity += -10
            break  
        case 68:
            // console.log("d key pressed")
            // console.log("----------------")
            xVelocity += 10
            break 
        case 83:
            // console.log("s arrow pressed")
            // console.log("----------------")
            yVelocity += 10
            break
    }
})

function distance(a, b){
    return Math.sqrt(Math.pow((a.xPosition - b.xPosition), 2) + Math.pow((a.yPosition - b.yPosition), 2))
}

function distance2(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function draw(){
    if(running){
        background(100)
        fill(255, 0, 0)
        circle(xPosition, yPosition, 50)

        let currentDate = Date.now()

        if(gameStarted){
            secondsTillDeath = parseFloat(((4 - (currentDate - date) / 1000).toFixed(2)))
        }

        if(hitCheckpoint){
            date = currentDate
        }

        document.getElementById("data").innerHTML = "score: " + score + "   must reach checkpoint in " + secondsTillDeath + " seconds"

        fill(0, 0, 255)
        if(hitCheckpoint){
            fill(255, 255, 255)
        }
        rect(checkpoints[0].xPosition, checkpoints[0].yPosition, 50, 50)

        document.getElementById('healthbar').style.width = healthbar + "px"

        if(lazers.length > 1){
            lazers.shift()
        }

        xPosition += xVelocity
        yPosition += yVelocity

        if(xPosition > 1378){
            xPosition -= 10
        }
        if(yPosition > 578){
            yPosition -= 10
        }
        if(xPosition < 22){
            xPosition += 10
        }
        if(yPosition < 22){
            yPosition += 10
        }

        for(let q = 0; q < lazers.length; q++){
            fill(255, 0, 0)
            rect(lazers[q].xPosition, lazers[q].yPosition, lazers[q].width, lazers[q].height)
            lazers[q].updateLazer()
        }

        for(let i = 0; i < enemies.length; i++){
            if(distance({xPosition: xPosition, yPosition: yPosition}, enemies[i]) < 52){
                // xVelocity *= -2
                // yVelocity *= -2
                if(xVelocity > 0){
                    xPosition -= 10
                } else{
                    xPosition += 10
                }

                if(yVelocity > 0){
                    yPosition -= 10
                } else{
                    yPosition += 10
                }
            }

            if(enemies[i].xPosition > 1300){
                enemies[i].enemyXVelocity *= -1
                enemies[i].xPosition -= 10
            }
            if(enemies[i].xPosition < 100){
                enemies[i].enemyXVelocity *= -1
                enemies[i].xPosition += 10
            }
            if(enemies[i].yPosition > 620){
                enemies[i].enemyYVelocity *= -1
                enemies[i].yPosition -= 10
            }
            if(enemies[i].yPosition < 100){
                enemies[i].enemyYVelocity *= -1
                enemies[i].yPosition += 10
            }

            enemies[i].update()

        }
    //-----------------------
        //console.log("checking if lazers hitting enemies", enemies, lazers)

        for(let j = 0; j < lazers.length; j++){
            for(let i = 0; i < enemies.length; i++){
                if(enemies.length >= 1){
                    if(Math.abs(lazers[j].xPosition - enemies[i].xPosition) < 25 && Math.abs(lazers[j].yPosition - enemies[i].yPosition) < 25){
                        enemies.splice(i, i + 1)
                        score++
                        //console.log("you hit a target!")
                    } else if((Math.abs(lazers[j].xPosition - enemies[i].xPosition) < 50 && Math.abs(lazers[j].yPosition - enemies[i].yPosition) < 50) && enemies[i].timeAlive > 9){
                        enemies.splice(i, i + 1)
                        //console.log("you hit a target!")
                        score++
                    }
                }
            }
        }

        if(distance2(xPosition, yPosition, checkpoints[0].xPosition, checkpoints[0].yPosition) < 45){
            hitCheckpoint = true
            console.log("on checkpoint")
        }

        if(secondsTillDeath < 0){
            running = false
            createCanvas(1400, 620)
            textSize(50)
            fill(0, 0, 0)
            text("score: " + score, 500, 325)
        }
//-----------------------
    }//end of if loop
    
} //end of draw

let enemies = []

let seconds = 0

setInterval(function(){
    if(gameStarted){
        let enemy = new Enemy(50)
    enemies.push(enemy)
    if(enemies.length > numEnemies){
        fill(255, 150, 150)
        enemies.splice(0, 1)
    }
    // console.log(enemies)
    }
}, 1400 - enemyTimeDecrease)

setInterval(function(){
    if(gameStarted){
        for(let i = 0; i < enemies.length; i++){
            enemies[i].timeAlive++
            enemies[i].colorGradient -= (3 * enemies[i].timeAlive)
            seconds++
        }
    }
}, 1000)

setInterval(function(){
    if(gameStarted){
        for(let i = 0; i < enemies.length; i++){
            if(Math.random() > .5){
                enemies[i].enemyXVelocity = 2
            }else{
                enemies[i].enemyXVelocity = -2
            }
        
            if(Math.random() > .5){
                enemies[i].enemyYVelocity = 2
            }else{
                enemies[i].enemyYVelocity = -2
            }
        }
    }
}, 1000)

setInterval(function(){
    if(gameStarted){
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].timeAlive > 6){
                healthbar -= 10
            }
        }
    
        if(healthbar < 0){
            document.getElementById('healthbar').style.width = 0 + "px"
            running = false
            createCanvas(1400, 620)
            textSize(50)
            fill(0, 0, 0)
            text("score: " + score, 500, 325)
        }
        if(numCheckpointsGotten > 3){
            numEnemies++
            numCheckpointsGotten = 0
            if(enemyTimeDecrease < 500)
            enemyTimeDecrease += 200
        }
    }
    
}, 1000)

setInterval(function(){
    if(gameStarted){
            let checkpoint = new Checkpoint()
        checkpoints.push(checkpoint)
        if(checkpoints.length > 1){
            checkpoints.splice(0, 1)
        }
        //console.log("adding checkpoint")
        if(hitCheckpoint){
            score++
            numCheckpointsGotten++
            secondsTillDeath = 4
        }
        hitCheckpoint = false
    }
}, 4000)