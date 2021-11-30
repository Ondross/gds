import {set, push, onValue, onChildAdded} from "./firebase.js";
let room;
let content = document.getElementById('content')
const now  = new Date();
let date = now.getFullYear().toString() + '-' + (now.getMonth()+1).toString() + '-' + now.getDate().toString()  ;
let affirmations = ['Everything is fine']

const params = new URLSearchParams(window.location.search)
for (const value of params.values()) {
    room = value;
}

document.getElementById('fname').value = localStorage.getItem('firstName')
document.getElementById('lname').value = localStorage.getItem('lastName')


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

let ding = new sound('ding.mp3');
console.log(date);
//console.log(room);

function callback(snapshot){
    console.log(snapshot.val())
}

function reset (){
  set('contact-tracing', null)
}


document.getElementById('submit').onclick = function(){
    let firstName = document.getElementById('fname').value; 
    let lastName = document.getElementById('lname').value;

    localStorage.setItem('firstName', firstName)
    localStorage.setItem('lastName', lastName)

    let person = cleanWord(firstName) + ' ' + cleanWord(lastName);
    let pathRoom = 'contact-tracing/byPerson/' + person + '/' + date;
    let pathUser = 'contact-tracing/users/' + person;
    let pathDate = 'contact-tracing/byDate/' + room + '/' + date + '/' + person;
    
    set(pathUser, {firstName: firstName, lastName: lastName})
    onValue('contact-tracing', callback)
    set(pathRoom, room)
    set(pathDate, true)
    // 
    // onChildAdded('users', callback)
    // onChildAdded('byPerson', callback)
    // onChildAdded('byDate', callback)
    getThanksScreen()
}

function getThanksScreen(){
    content.remove()
    ding.play()

    let body = document.getElementsByTagName('body')[0]
    body.style.backgroundColor = '#7ED957';

    let finalMessage = document.createElement('div');
    finalMessage.setAttribute('id', 'thanks-div')
    body.appendChild(finalMessage)
    finalMessage.innerHTML = 'Welcome!';

    let affirmation = affirmations[Math.floor(Math.random()*affirmations.length)]
    let affirmationDiv = document.createElement('div');
    affirmationDiv.setAttribute('id', 'affirmation')
    body.appendChild(affirmationDiv)
    affirmationDiv.innerHTML = affirmation;
}