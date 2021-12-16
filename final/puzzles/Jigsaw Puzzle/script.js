import {set, onValue} from "./firebase.js"

let solved
let refImage1
let refImage2
let refImage3
let index
let completed = false
let mode = 0
let images
let draggableImages
let imageSolutions = []

let easySolutions = [[100, 100], 
                     [150, 100], 
                     [200, 100], 
                     [100, 150], 
                     [150, 150], 
                     [200, 150], 
                     [100, 200], 
                     [150, 200], 
                     [200, 200]]

let mediumSolutions = []

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        mediumSolutions[i*4 + j] = [100 + j * 50, 100 + i * 50]
    }
}

let hardSolutions = []

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
        hardSolutions[i*6 + j] = [100 + j * 50, 100 + i * 50]
    }
}

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
        set(xpath + "/x",  x)
       
        const ypath = "puzzle/piece" + this.id
        set(ypath + "/y",  y)

        onValue("puzzle/piece" + this.id + "/x", (snapshot) => {
            console.log(snapshot.val())
            this.x = snapshot.val()
        })
       onValue("puzzle/piece" + this.id + "/y", (snapshot) => {
           this.y = snapshot.val()
       })
    }

   isCorrect(){

       return (this.x === this.xSolution) && (this.y === this.ySolution)
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
       // console.log(this.id, this.dragging, this.x)
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

let easyImages = ["earthimage1.jpg",
"earthimage2.jpg",
"earthimage3.jpg",
"earthimage4.jpg",
"earthimage5.jpg",
"earthimage6.jpg",
"earthimage7.jpg",
"earthimage8.jpg",
"earthimage9.jpg"]

function easy(){
    images =  easyImages
    imageSolutions = easySolutions
}

let mediumImages = ['bucketimage1.jpg',
    'bucketimage2.jpg',
    'bucketimage3.jpg',
    'bucketimage4.jpg',
    'bucketimage5.jpg',
    'bucketimage6.jpg',
    'bucketimage7.jpg',
    'bucketimage8.jpg',
    'bucketimage9.jpg',
    'bucketimage10.jpg',
    'bucketimage11.jpg',
    'bucketimage12.jpg',
    'bucketimage13.jpg',
    'bucketimage14.jpg',
    'bucketimage15.jpg',
    'bucketimage16.jpg']


function medium(){
    images = mediumImages
    imageSolutions = mediumSolutions
}

let hardImages = ["catimage1.jpg",
    "catimage2.jpg",
    "catimage3.jpg",
    "catimage4.jpg",
    "catimage5.jpg",
    "catimage6.jpg",
    "catimage7.jpg",
    "catimage8.jpg",
    "catimage9.jpg",
    "catimage10.jpg",
    "catimage11.jpg",
    "catimage12.jpg",
    "catimage13.jpg",
    "catimage14.jpg",
    "catimage15.jpg",
    "catimage16.jpg",
    "catimage17.jpg",
    "catimage18.jpg",
    "catimage19.jpg",
    "catimage20.jpg",
    "catimage21.jpg",
    "catimage22.jpg",
    "catimage23.jpg",
    "catimage24.jpg",
    "catimage25.jpg",
    "catimage26.jpg",
    "catimage27.jpg",
    "catimage28.jpg",
    "catimage29.jpg",
    "catimage30.jpg",
    "catimage31.jpg",
    "catimage32.jpg", 
    "catimage33.jpg",
    "catimage34.jpg",
    "catimage35.jpg",
    "catimage36.jpg"]

function hard(){
    images = hardImages
    imageSolutions = hardSolutions
}

window.preload = function(){
    easyImages = easyImages.map((path) => loadImage(path))
    mediumImages = mediumImages.map((path) => loadImage(path))
    hardImages = hardImages.map((path) => loadImage(path))

    refImage1 = loadImage('earth image.jpeg')
    refImage2 = loadImage('bucketimage.jpg')
    refImage3 = loadImage('catimage.jpg')
}

let s;
let v;
let d;
window.setup = function() {
    let canvas = createCanvas(800, 600);
    canvas.position(100, 100)
    s = createButton("easy")
    s.position(100,100)
    s.mousePressed(() => {
        easy()
        updatemode()
    })
    v = createButton("medium")
    v.position(100,150)
    v.mousePressed(() => {
        medium()
        updatemode()
    })
    d = createButton("hard")
    d.position(100,200)
    d.mousePressed(() => {
        hard()
        updatemode()
    })
}

window.draw = function() {
    function solutionBox(){
        if (images === easyImages){
            fill('white')
            rect(100, 100, 150, 150)
        }
        if (images === mediumImages){
            fill('white')
            rect(100, 100, 200, 200)
        }
        if (images === hardImages){
            fill('white')
            rect(100, 100, 300, 300)
        }
       
    }    
    
 

    window.updatemode = function(){
        mode = mode + 1

        if (mode === 1){
            s.hide()
            v.hide()
            d.hide()
            draggableImages = images.map((img, index) => {
                const solution = imageSolutions[index]
                return new Draggable(
                    Math.random() * 600,
                    Math.random() * 475,
                    50,
                    50,
                    img,
                    solution[0],
                    solution[1],
                    index)
            })
        }
    }


        background("aqua")
        fill('white')

        if (mode == 0){
            background("aqua")
        }
        if (mode == 1){
            solutionBox()
            let over = false

            draggableImages.forEach(draggable => {
                
                if (!over) {
                    over = draggable.over()
                }
                draggable.update()
                draggable.show()
                
            }) 
            if (draggableImages.every(img => img.isCorrect())) {
                background('aqua')
                fill('white')
                textSize(45)
                text('YOU SOLVED THE PUZZLE!!!', 100, 100)
            }
        }

}

window.isCorrect = function() {
    solved = this.x === this.xSolution && this.y === this.ySolution
    if (solved) {
        console.log(this.id)
    }
    return solved
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