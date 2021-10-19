let currentBoard = 1;
let currentPlayer = 1;
let numOfPlayers = 4;
let finalPrompt;
let time = 10;

document.getElementById('submit-players').onclick = function(){
    numOfPlayers = document.getElementById('num-players').value;
    console.log(numOfPlayers)
    document.getElementById('players-form').remove()
    getInput("list")
        
}
function startDrawingTurn (){
    console.log(currentPlayer)
    
    if (currentPlayer > numOfPlayers){
        displayAll()
    }
    isDrawing = 1
    background(255)
    alert(`Player ${currentPlayer} start drawing!`)
    countdown(time)
    currentBoard += 1
    currentPlayer +=1
}


function startWritingTurn(){
    console.log(currentPlayer)
    if (currentPlayer > numOfPlayers){
        displayAll()
    }
    alert(`Player ${currentPlayer} what did player ${currentPlayer-1} draw?`)
    currentPlayer +=1
    getInput()
    

}


function countdown(time) {
    let timer = setInterval(function () {
        document.getElementById("counter-div").innerHTML = time 
        time -= 1
        if (time < 0) {clearInterval(timer)
            saveBoard(currentBoard)
            isDrawing = 0
            startWritingTurn()
            /*if (currentPlayer === numOfPlayers){
                displayAll()
            }*/
        }
    }, 1000)
    
}


function getInput(x) { // this function updates variable inputVal with user's input, use parameter "list" to get prompts
    let input = document.createElement("input") // create input box
    input.setAttribute("type", "text")
    input.setAttribute("id", "test")
    if (x === "list"){
        input.setAttribute('placeholder', 'Write some drawing prompts (separate prompts with commas): ')
    }else{
        input.setAttribute('placeholder', 'Write a caption: ')

    }
  promptDiv = document.getElementById("prompt-div").innerHTML = ''
  document.getElementById("prompt-div").appendChild(input) 

  let btn = document.createElement("button") // create button
  btn.setAttribute('id', 'submit')
  btn.innerHTML = "Done!"
  document.getElementById("prompt-div").appendChild(btn)
  
  btn.onclick = function () {
        console.log("clicked")
        
        document.getElementById('prompt-div').innerHTML = input.value;
    if (x === "list") { // if getInput is run with parameter "list," split values into array and randomly choose one
      let prompts = input.value.split(",")
      console.log(prompts)
      promptDiv.outerHTML = ""
      finalPrompt = prompts[Math.floor(Math.random() * prompts.length)]
      document.getElementById('prompt-div').innerHTML = finalPrompt
      console.log(finalPrompt)
      answers.push(finalPrompt)
    } else { // otherwise, get value and update global variable inputVal
      //input.outerHTML = "" // clear the prompt div
     // btn.outerHTML = ""
      answers.push(input.value)
    }
    startDrawingTurn()
  }
}
  
