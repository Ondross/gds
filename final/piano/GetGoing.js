
let chosen = [

]

function toggleTheme(value) {
    var sheets = document
    .getElementsByTagName('link');

sheets[0].href = value;
}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      if (this.sound.paused) {
        this.sound.play();
    }else{
        this.sound.currentTime = 0
    }
 }
    }


class Note {
    constructor(soundName) {
        this.sound = new sound('notes_' + soundName + '.mp3')
        this.circle = new Circle(
            circleHeights[soundName.replace('s', '')],
            soundName.indexOf('s') !== -1
        )
    }
    
    play(){
        this.sound.play()

     }

    
}



class Key {
    
    constructor(noteName) {
        this.noteName = noteName
        console.log(this.noteName)
        this.sound = new sound('notes_' + noteName + '.mp3')
        document.getElementById(this.noteName).onclick = () => {
            
            
            if (chosen.length < 26){

                console.log("yes")
            this.sound.play()

                let newDiv = document.createElement("div")

            const myDiv = document.getElementById("bottom")

            document.body.appendChild(newDiv, myDiv)

           
            chosen.push(new Note(noteName))
            console.log(chosen.length)

            }

            else if (chosen.length > 26) {
                chosen.length = 26
                console.log("oops")

            }

        }
    }

   
}

const circleHeights = {
    "C" : "11%",
    "D" : "16%",
    "E" : "21.3%",
    "F" : "26.7%",
    "G" : "32%",
    "A" : "38%",
    "B" : "42.2%",
}

const keys = [
    new Key("C"),
    new Key("Cs"),
    new Key("D"),
    new Key("Ds"),
    new Key("E"),
    new Key("F"),
    new Key("Fs"),
    new Key("G"),
    new Key("Gs"),
    new Key("A"),
    new Key("As"),
    new Key("B"),
    //new Key("hC"),
]

function startPlaying() {
    let i = 0;
    const playbackInterval = setInterval(function() {
        if (chosen[i]) {
            chosen[i].play()
            i++
        } else {
            clearInterval(playbackInterval)
        }
    }, 500)
}

function reset() {
    chosen = []
    document.getElementsByClassName('drawings')[0].innerHTML = ""

    console.log(chosen)
}

function Circle(bottom, isSharp){
    var btn = document.createElement("div")
    btn.className = "circle"
    btn.style.left = chosen.length * 50 + 100 + "px"
    btn.style.bottom = bottom

    if (isSharp) {
        btn.innerHTML = "#"
    }

    document.getElementsByClassName('drawings')[0].appendChild(btn)
}


