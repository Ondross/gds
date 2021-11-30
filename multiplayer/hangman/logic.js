import {set, push, onValue, onChildAdded} from "./firebase2.js"
import {words} from "./words.js"

//creates a gamePath memory storage that multiple computers access via firebase
const gamePath = "hangman/1"

//creates a subset of gamePath that stores letter guesses
const guessesPath = gamePath + "/guesses"

//creates a subset of gamePath that stores words
const wordPath = gamePath + "/word"

//clears all data from the server
set(gamePath, null)

//these clear the data from all the variables, divs, and arrays 
let guessedLetters = []
let wonGame = false
let wonArray = []
let correctlyGuessed = false
let incorrectGuesses = 0
let incorrectLetters = []
let youLost = false
document.getElementById("guessedLetters").innerHTML = "incorrect letters: "

//this is the main function where most of the logic behind the game is executed
//keep in mind all the code in logStuff runs each time the user submits a new letter
function logStuff(snapshot) {

    //makes sure that the game only runs if the players haven't lost
    if(!youLost){

    //gets the input that any player submitted into the input box directly from the firebase server
    const userInput = snapshot.val()

        //this for loop iterates through the chosen word and checks to see if the inputted value is a part of the word
        for(let j = 0; j < word.length; j++){
            if(userInput === word.charAt(j)){
                correctlyGuessed = true

                //if the inputted letter matches a letter in the word, this checks if that letter is already recorded as a guessed letter
                //if the inputted letter is not recorded as a guessed letter, it will be added to the guessedLetters array
                if(!guessedLetters.includes(userInput)){
                    guessedLetters.push(word.charAt(j))
                }
            }
        }
        
        //this checks to see if the selected word includes the user input (like the previous for loop)
        //it also checks to see if the user input is already included in the incorrect letters array
        //basically if a user input is wrong and not in the incorrect letter array, it will be added to the incorrect letters array
        //it also prints the incorrect letter to the screen so the user knows what letters not to guess
        if(!word.includes(userInput) && !incorrectLetters.includes(userInput)){
            incorrectLetters.push(userInput)
            document.getElementById("guessedLetters").innerHTML += userInput + " "
            console.log("logging incorrect letter")
        }

        //this increases the value of the incorrect guesses variable if the user inputs an incorrect letter
        //the game will end (and the player will lose) if incorrect guesses reaches 6
        if(!correctlyGuessed){
            incorrectGuesses += 1
        }

        //sets correctly guessed to false. this will change if the user correctly guesses a letter
        correctlyGuessed = false

        //this clears the input box and the dashes and guessed letters that make up the chosen word after the user enters a value
        //the word will quickly be refilled
        document.getElementById("inputBox").value = ""
        document.getElementById("wordBox").innerHTML = ""

        //this rebuilds the word so that each letter slot that contains a guessed letter will be filled with the letter and
        //each slot that doesn't contain a guessed letter will be filled with a dash
        for(let i = 0; i < word.length; i++){

            if(guessedLetters.includes(word.charAt(i))){
                document.getElementById("wordBox").innerHTML += word.charAt(i) + " "
            }else{
                document.getElementById("wordBox").innerHTML += "_ "
            }

        }

        //this iterates through the word and for each letter that is already guessed, a 0 is added to the won array
        //for each letter that is not already guessed, a 1 is added to the won array
        //later on in the code, the won array is reset to an empty array
        //the idea is that if the won array ever comes out of this for loop containing only 0s, then the players have guessed the word and the game will end
        for(let k = 0; k < word.length; k++){
            if(guessedLetters.includes(word.charAt(k))){
                wonArray.push(0)
            } else{
                wonArray.push(1)
            }
        }

        //here it is. this checks to see if the wonArray only includes 0s. if it does, it ends the game by setting...
        //wonGame to true
        if(!(wonArray.includes(1))){
            wonGame = true
        }

        //this code will indicate that the players won the game
        //it displays the words YOU WON!
        //it also shows a confetti gif
        if(wonGame){
            document.getElementById("victoryBox").innerHTML = "YOU WON!"
            let img = document.createElement('img')
            img.src = "https://i.pinimg.com/originals/e5/83/3e/e5833e1bea7d379f0f4e4ae250b7cf81.gif"
            document.getElementById("victoryImg").appendChild(img)
        }

        //this resets the wonArray to an empty array. that way the previous code can rebuild the array without problems after another iteration
        wonArray = []

        //this is the code that displays the number of wrong guesses that the players have submitted
        document.getElementById("numWrongGuesses").innerHTML = "you guessed wrong " + incorrectGuesses + " times"

        //this checks to see if the players have guessed incorrectly more than 5 times
        //if they have, it runs the code to let the user know they lost the game
        //beyond just displaying YOU LOSE it also shows an image of stewie from family guy saying 'you suck'
        if(incorrectGuesses > 5){
            document.getElementById("victoryBox").innerHTML = "YOU LOSE"
            let img2 = document.createElement('img')
            img2.src = "https://c.tenor.com/f6kMq8yRIlsAAAAM/you-suck-stewie.gif"
            document.getElementById("victoryImg").appendChild(img2)
        }
    }
    
}
//^^ this is the end of the logstuff function

//this runs every time the user presses enter (so every time they submit a letter)
function pressedEnter() {
    
    //this gets the value a player submitted from the input box
    let guess = document.getElementById("inputBox").value

    //this adds the guess from one of the players to the shared data in the firebase server
    push(guessesPath, guess)
    console.log("it worked")
}

//this makes it so that every time a new guess is added to the guessesPath (so every time a user inputs a guess) it saves the...
//value of the guess in a snapshot variable that logStuff will access and put into the userInput variable
//it also calls logstuff
onChildAdded(guessesPath, function(snapshot){console.log("fb" + snapshot.val())})
onChildAdded(guessesPath, logStuff)

//this checks to see if the enter key is pressed. whenever the enter key is pressed it runs the pressedEnter function
document.getElementById("inputBox").addEventListener('keypress', function (e){
    if(e.key === 'Enter'){
        pressedEnter()
    }
})



//this defines the word and also the setWordFromFirebase function which basically restarts the game
let word = ""
function setWordFromFirebase(snapshot) {

    //the idea behind all these equality statements is that it gets rid of all the data that has been stored in previous games
    //all the divs are set to empty strings, all the numeric values are set to 0, and all the arrays are made empty 
    //the booleon values are also set to false
    incorrectGuesses = 0
    document.getElementById("victoryBox").innerHTML = ""
    document.getElementById("numWrongGuesses").innerHTML = "you guessed wrong: 0 times"
    guessedLetters = []
    wonGame = false
    console.log("restarting game")
    youLost = false
    document.getElementById("victoryImg").innerHTML = ""
    document.getElementById("guessedLetters").innerHTML = "incorrect letters: "

    //this sets the word variable equal to the value that just entered the guessesPath in the server
    //in other words it it allows all the computers to save the same word as the word everyone's trying to guess
    word = snapshot.val()

    //this makes it so that once the word is chosen, the word is built out of dashes that will later...
    //be turned into letters as the players guess letters
    if (word) {
        document.getElementById("wordBox").innerHTML = ""
        for(let i = 0; i < word.length; i++){
            document.getElementById("wordBox").innerHTML += "_ "
        }
    }
}

//this is the code that chooses the word
//it work by using math.random to take a random number between 0 and the length of the words array...
//and then selecting the word in the words array that has the index that was just calculated
//the words array is in a seperate file and contains a list of possible hangman words
//it also puts the chosen word in the wordPath memory location in the server
let selector = Math.random() * words.length
let randomWord = words[Math.floor(selector)]
set(wordPath, randomWord)

//this code makes it so that when the wordPath gets a new value, the setWordFromFirebase code is run
//that basically causes the game to restart with the code in the previous function
onValue(wordPath, setWordFromFirebase)

//this is the function that when run restarts the game
//because it sets the wordPath to a new value, it will end up causing setWordFromFirebase
//that has the effect of restarting the game
//it also chooses a new word since the code to do that is not contained inside setWordFromFirebase
function restartGame(){
    let selector = Math.random() * words.length
    let randomWord = words[Math.floor(selector)]
    set(wordPath, randomWord)
    console.log("restarting game")
}

//this is the code that makes it so that anytime the user clicks the 'restart game' button, the game restarts
document.getElementById("restartGame").onclick = function() {restartGame()}

/*
(╯°□°）╯︵ ┻━┻ --> (me when Andrew tells me I have to make my code make sense)
*/