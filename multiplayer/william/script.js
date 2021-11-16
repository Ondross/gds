import {set, onValue} from "./firebase.js"

let index
let completed = false
var mode = 0
let images
let s
let draggableImages
let imagepaths = ["earthimage1.jpg",
                  "earthimage2.jpg",
                  "earthimage3.jpg",
                  "earthimage4.jpg",
                  "earthimage5.jpg",
                  "earthimage6.jpg",
                  "earthimage7.jpg",
                  "earthimage8.jpg",
                  "earthimage9.jpg"]

let imageSolutions = [[100, 100], 
                     [150, 100], 
                     [200, 100], 
                     [100, 150], 
                     [150, 150], 
                     [200, 150], 
                     [100, 200], 
                     [150, 100], 
                     [200, 200]]

class Draggable {

    constructor(x, y, w, h, img, xSolution, ySolution, id) {
        this.dragging = false
        this.rollover = false
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.offsetX = 0
        this.offsetY = 0
        this.img = img
        this.id = id
        this.xSolution = xSolution
        this.ySolution = ySolution

        const xpath = "puzzle/piece" + this.id
        set(xpath + "/x", Math.random() * 500)
       
        const ypath = "puzzle/piece" + this.id
        set(ypath + "/x", Math.random() * 500)

        onValue("puzzle/piece" + this.id + "/x", (snapshot) => {
            console.log(snapshot.val())
            this.x = snapshot.val()
        })
       onValue("puzzle/piece" + this.id + "/y", (snapshot) => {
           this.y = snapshot.val()
       })
    }

    isCorrect() {
        let solved = this.x === this.xSolution && this.y === this.ySolution
        if (solved) {
            console.log(this.id)
        }
        return solved
    }

    over() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true
        } else {
            this.rollover = false
        }
        return this.rollover
    }

    update() {
        if (this.dragging) {
            const x = Math.round((mouseX + this.offsetX)/10) * 10 

            const y = Math.round((mouseY + this.offsetY)/10) * 10 

            const xpath = "puzzle/piece" + this.id
            set(xpath + "/x", x)

            const ypath = "puzzle/piece" + this.id 
            set(ypath + "/y", y)
        }
        // write this.x and this.y to firebase

        // in alternate code: this.x updates from firebase
    }

    show() {
        image(this.img, this.x, this.y, this.w, this.h)
    }

    pressed() {
        if (this.rollover) {
            this.dragging = true
            this.offsetX = this.x - mouseX
            this.offsetY = this.y - mouseY
        }
    }

    released() {
        this.dragging = false
    }
}

window.preload = function(){
    images = imagepaths.map((path) => loadImage(path))
}
window.setup = function() {
    let canvas = createCanvas(600, 600);
    canvas.position(100, 100)
    let s = createButton("Start!")
    s.position(100,100)
    s.mousePressed(updatemode)
    draggableImages = images.map((img, index) => {
        const solution = imageSolutions[index]
        return new Draggable(
            Math.random() * 500,
            Math.random() * 500,
            50,
            50,
            img,
            solution[0],
            solution[1],
            index)
    })
}

window.updatemode = function(){
    mode = mode + 1 
}

window.draw = function() {
    background("aqua")
    fill('white')
    rect(100, 100, 150, 150)
    if (mode == 0){
        background("aqua")
    }
    if (mode == 1){
        let over = false
        draggableImages.forEach(draggable => {
            if (!over) {
                over = draggable.over()
            }
            draggable.update()
            draggable.show()
        }) 
        if (draggableImages.every(img => img.isCorrect())) {
            console.log("DONE")
        }
    }
}

window.mousePressed = function() {
    draggableImages.forEach(draggable => {
        draggable.pressed()
    })
}

window.mouseReleased = function() {
    draggableImages.forEach(draggable => {
        draggable.released()
    })
}