import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import {
    getDatabase,
    ref,
    get as fbGet,
    push as fbPush,
    set as fbSet,
    onValue as fbOnValue,
    onChildAdded as fbOnChildAdded,
} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js'


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPsVvFTnw8zEhHzZK_wY7jyinYdPR-vmw",
    authDomain: "dit-multiplayer.firebaseapp.com",
    projectId: "dit-multiplayer",
    storageBucket: "dit-multiplayer.appspot.com",
    messagingSenderId: "854141479572",
    appId: "1:854141479572:web:9913f172026dabb12fe281",
    databaseURL: "https://dit-multiplayer-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Export some wrappers for convenience
const buildPath = (path) => ref(database, path)
const get = (path) => fbGet(buildPath(path))
const set = (path, value) => fbSet(buildPath(path), value)
const push = (path, value) => fbPush(buildPath(path), value)
const onValue = (path, callback) => fbOnValue(buildPath(path), callback)
const onChildAdded = (path, callback) => fbOnChildAdded(buildPath(path), callback)


export {set, push, onValue, onChildAdded, get}