
import {getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged, getRedirectResult} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

import {logOut} from './script.js'

import {set, push, onValue, onChildAdded} from "./firebase.js"

console.log("IMPORTED Auth.js")

const auth = getAuth();

const provider = new GoogleAuthProvider();

let adminList = ['miles.r.waterman@gmail.com', "ergunjon0@gmail.com"]

let banList = ["miles.watermelon@gmail.com"]

banList.window = banList

document.getElementsByClassName('login')[0].onclick = () => {
  console.log("LOGIN")
  document.getElementsByClassName('login')[0].style.display = "none"
  signInWithRedirect(auth, provider);
}

document.getElementsByClassName('logout')[0].onclick = () => {
  signOut(auth)
  logOut()
}

function checkAdmin(userToBeChecked){
  if(adminList.includes(userToBeChecked)){
    return true
  } else{
    return false
  }
}



onAuthStateChanged(auth, (user) => {

  console.log("AUTH STATE CHANGED")
  if (user) {
    if(banCheck(user.email)){
      console.log("oof")
      redirectToBanPage()
    }
    window.userName = user.displayName;
    checkAdmin(user.email)
    //console.log(window.userName)
  }
  else {
    window.userName = "UNAVALIBLE"
  }
  return userName
});

function banCheck(queryUser){
  for(let i = 0; i < banList.length; i++){
    if(queryUser === banList[i]){
      console.log("pingBanned")
      return true
    }
  }
}

function redirectToBanPage() {
  document.getElementById("everything").style.display = "none"
  document.getElementById('everythingelse').style.display = "none"
  document.getElementsByClassName("welcomebanner")[0].style.display = "none"
  document.getElementsByClassName("login")[0].style.display = "none"
  document.getElementsByClassName("banpage")[0].style.display = "block"
}
/*
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log(user)
  })
  signInWithRedirect(auth, provider);
*/

  // on auth state changed
  // result => if user, set global username to user
  // else signinwithredirect


 /* 
  onAuthStateChanged(auth, function(user) {
    if (user) {
      console.log(user)
      console.log('ba ba boyee')
    }
    else{
      signInWithRedirect(auth, provider);
    }
  });
*/

export {checkAdmin, banCheck, banList}