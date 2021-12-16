let death
let mode = 0
x = 0
y = 50
xVelocity = 0
yVelocity = 0
timer = 40
youWon2 = false
youLost2 = false
youLost = false
textAlignment = 820
youWon = false
xValues = []
yValues = []
let level = 0
timer2 = 60

function startLevel() {
     youWon = false
     youLost = false
     x = 0
     y = 50
     timer = 40
}

function updateMode(){
     mode = mode + 1
     // death = loadSound('death.mp3')
     // userStartAudio();

}

function decreaseMode(){
     startLevel()
     mode = mode - 1
}

function updateLevel(){
     level = level + 1
}

function preload(){
     img = loadImage("realmaze1.png")
}

function setup()  {
     // getAudioContext().suspend();
    createCanvas(1050, 600)
    strokeWeight(5)
    textSize(42)
    let s = createButton("Start!")
    s.position(900,100)
    s.mousePressed(updateMode) 
    let d = createButton("retry")
    d.position(900,200)
    d.mousePressed(decreaseMode)
}

function draw()  {
     background(0,0,0)
    
    if(level == 0){
     if(mode == 0){
          background(0)
          textSize(45)
          stroke('red')
          text("start", 400, 100)
     } else if(mode == 1){
          
               // Runs timer if you lost and you won are both false.
               text(timer, textAlignment, 100)
               let runTimer = !youWon && !youLost
               if (frameCount % 60 == 0 && timer > 0 && runTimer) {
                    timer --
               }
               
               // If the timer is equal to zero print "Game Over"
               if(timer == 0) {
                    updateMode()
               }

               // Draws Maze
               drawMaze()
          
               // Collision detection.
               if(get(x, y)[2] !== 0 || youLost) {
                    updateMode()
               }
               fill(255, 0, 0)
               stroke('red')
               circle(x, y, 15)

               if (x >= 800 && !youLost || youWon) {
                    youWon = true
                    }               

          } else if(mode == 2){
          background(0)
          textSize(45)
          stroke('red')
          text("loser", 400, 100)
     } else {
          console.log("invalid mode: ", mode)
     }
 } 
 if(level == 1){
     background("white")
    image(img, 25, 25, 600, 525)

     if (y >= 530 && !youLost2 || youWon2) {
          youWon2 = true
     }
     
     if(get(x, y)[2] == 0 || youLost) {
          updateLevel()  
     }
     circle(x, y, 7)
     
     text(timer2, textAlignment, 100)
     let runTimer2 = !youWon2 && !youLost2
     if (frameCount % 60 == 0 && timer2 > 0 && runTimer2) {
           timer2 --
     }

     if(timer2 == 0){
          updateLevel()
     }

 }else if(level == 2){
     background('blue')
     textSize(45)
     stroke('red')
     text("loser", 400, 100)
}
 
    if(youWon == true){
          startLevel()
          updateLevel()
     }

     if(youWon2 == true){
          startLevel()
          updateLevel()
     }

    // Stores x values in List.
    xValues.push(x)
    yValues.push(y)
                
    if(youLost2 == true){
      //death.play()
       updateLevel()
 }
     console.log(level)

    if(youLost == true){
        //  death.play()
          updateMode()
    }
  
    if (keyIsDown(LEFT_ARROW)) {
         x = x - 2
    }
     if (keyIsDown(RIGHT_ARROW)) {
         x = x + 2
    }
    if (keyIsDown(UP_ARROW)) {
         y = y - 2
    }
    if (keyIsDown(DOWN_ARROW)) {
         y = y + 2
    }               
} 
