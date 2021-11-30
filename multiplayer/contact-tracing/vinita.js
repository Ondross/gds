import {set, push, onValue, onChildAdded, buildPath, get} from "./firebase.js";
let submit = document.getElementById('submit');
let rooms = {};
let people = {};
let peopleList = [];

let startInput = document.getElementById('start')
let endInput = document.getElementById('end')
let now = new Date
let date = now.getFullYear().toString() + '-' + (now.getMonth()+1).toString() + '-' + now.getDate().toString()

let today = new Date()
let endDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
today.setDate(today.getDate() - 7)
let aWeekAgo = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
startInput.value = aWeekAgo;
endInput.value = endDate

function getDates (startDate, endDate) {
    let start = startDate.split('-')
    let end = endDate.split('-');
    let startDateFinal = [];
    let endDateFinal = [];
    for (let i = 0; i<3; i++){
        startDateFinal.push(parseInt(start[i]))
        endDateFinal.push(parseInt(end[i]))
    }

    const dates = []
    let currentDate = new Date(startDateFinal[0], startDateFinal[1]-1, startDateFinal[2]);
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= new Date(endDateFinal[0], endDateFinal[1]-1, endDateFinal[2])) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
      console.log(currentDate)
    }
    return dates
  
}

function callback(snapshot){
  //console.log(snapshot.val())
  let room =  snapshot.val();
  let date = snapshot.key;
  //console.log(snapshot.key)
  rooms[date] = room
  console.log('rooms' , rooms)
}

function peopleCallback(snapshot){
  //console.log(snapshot.val())
  let person =  snapshot.val();
  let date = snapshot.key;
  //console.log(snapshot.key)
  console.log(people[date])
  people[date] = person;

  if (person !== null){
    let namesInRoom = Object.keys(person);
    for (let i =0; i< namesInRoom.length; i++){
      if (peopleList.includes(namesInRoom[i]) === false){
        peopleList.push(namesInRoom[i])
      }
    }
  }

  console.log('people',people)
}

function display(exposed, allPeople, person){
  //createDiv('all-names-div', document.getElementsByTagName('body')[0], '')
  let allNamesDiv = document.createElement('div');
  allNamesDiv.setAttribute('id', 'all-names-div')
  document.getElementsByTagName('body')[0].appendChild(allNamesDiv)

  //createDiv('names-heading-div', document.getElementById('all-names-div'), 'All people exposed: ')
  let title = document.createElement('div');
  title.setAttribute('id', 'names-heading-div')
  title.innerHTML = "All people exposed:"
  allNamesDiv.appendChild(title)

  let bodyDiv = document.createElement('div');
  bodyDiv.setAttribute('id', 'names-body-div')
  allNamesDiv.appendChild(bodyDiv)

  let byDateDiv = document.createElement('div');
  byDateDiv.setAttribute('id', 'by-date-div')
  document.getElementsByTagName('body')[0].appendChild(byDateDiv)

  for (let i =0; i< allPeople.length; i++){
    if (allPeople[i] != person){
      let nameNode = document.createTextNode(allPeople[i].replace("-", ' ') + ', ')
      bodyDiv.appendChild(nameNode)
    }
  }

  let keys = Object.keys(exposed);
  console.log(keys)
  for(let i = 0; i < keys.length ; i++){

    let date = keys[i];
    
    let dateDiv = document.createElement('div');
    dateDiv.setAttribute('class', 'date-div')
    dateDiv.innerHTML = date.slice(5);
    byDateDiv.appendChild(dateDiv)

    if (exposed[date] != null){
      let names = Object.keys(exposed[date]);
      console.log(date + names)
      let namesDiv = document.createElement('div');
      namesDiv.setAttribute('class', 'names-div')
      byDateDiv.appendChild(namesDiv)

      for(let j = 0; j < names.length; j++){
        let nameWithoutDash = names[j].replace("-", ' ')
        let nameNode1 = document.createTextNode(nameWithoutDash + ', ')
        namesDiv.appendChild(nameNode1)
      } 
    }
  }
}

async function getRooms(dates, person){
  //let rooms = {}
  for (let i = 0; i < dates.length; i++){
    let pathRoom = 'contact-tracing/byPerson/' + person + '/' + dates[i]
    //let pathRoom = 'contact-tracing/byPerson/' + person 
    console.log(pathRoom)
    //rooms[dates[i]] = pathRoom.val()
    let roomSnapshot = await get(pathRoom);
    callback(roomSnapshot)
  }
  for (let i = 0; i < dates.length; i++){
    let currentDate = dates[i];
    console.log('inloop',rooms)
    console.log("current room", rooms[currentDate])
    let pathDate = 'contact-tracing/byDate/' + rooms[currentDate] + '/' + currentDate
    console.log(pathDate)
    let personSnapshot = await get(pathDate);
    peopleCallback(personSnapshot)
  }
  console.log(peopleList)
  document.getElementById('content').remove()
  display(people, peopleList, person)
}



submit.onclick = function(){
    let firstName = document.getElementById('fname').value; 
    let lastName = document.getElementById('lname').value;
    let person = cleanWord(firstName) + ' ' + cleanWord(lastName);

    let startInput = document.getElementById('start').value;
    let endInput = document.getElementById('end').value

    let dates = getDates(startInput, endInput).map(date => date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate())
    console.log('dates', dates)
    getRooms(dates, person)
    //console.log('people', getPeople(dates, rooms))
}

  
