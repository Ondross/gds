
import {getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged, getRedirectResult} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

import {logOut} from './script.js'

import {set, push, onValue, onChildAdded} from "./firebase.js"

const auth = getAuth();

const provider = new GoogleAuthProvider();

document.getElementById('login').onclick = () => {
  document.getElementById('login').style.display = "none"
  signInWithRedirect(auth, provider);
}

document.getElementById('logout').onclick = () => {
  signOut(auth)
  logOut()
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if(banCheck(user.email)==0){
      console.log("oof")
      signInWithRedirect(auth, provider);
    }
    window.userName = user.displayName;
    //console.log(window.userName)
  }
  else{
    window.userName = "UNAVALIBLE"
  }
  return userName
});

function banCheck(queryUser){
  let banned1 = "ergunjon0@gmail.com"
  let banned2 = "karateyang@gmail.com"
  const banList = [banned1, banned2]
  //console.log(banList.length)
  for(let i = 0; i<banList.length; i++){
    if(queryUser === banList[i]){
      console.log("pingBanned")
      return(0)
    }
  }
  //console.log("pingAllowed")
  return(1)
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