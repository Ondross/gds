var inputVal

function getInput(x) { // this function updates variable inputVal with user's input, use parameter "list" to get prompts
  let input = document.createElement("input") // create input box
  input.setAttribute("type", "text")
  input.setAttribute("id", "test")
  input.setAttribute('placeholder', 'Write a caption: ')
  document.getElementById("prompt-div").appendChild(input) 

  let btn = document.createElement("button") // create button
  btn.innerHTML = "Done!"
  document.getElementById("prompt-div").appendChild(btn)
  
  btn.onclick = function () {
    if (x === "list") { // if getInput is run with parameter "list," split values into array and randomly choose one
      let prompts = input.value.split(",")
      console.log(prompts)
      input.outerHTML = ""
      btn.outerHTML = ""
      let finalPrompt = prompts[Math.floor(Math.random * prompts.length)]
      return finalPrompt
    } else { // otherwise, get value and update global variable inputVal
      answers.push(input.value)
      input.outerHTML = "" // clear the prompt div
      btn.outerHTML = ""
    }
  }
}






