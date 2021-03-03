import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAVSNTp1x4SvWCujoGlqnqAGpeXjeyEYGc",
    authDomain: "slack-clone-8fe52.firebaseapp.com",
    projectId: "slack-clone-8fe52",
    storageBucket: "slack-clone-8fe52.appspot.com",
    messagingSenderId: "874376933252",
    appId: "1:874376933252:web:7b23fff0872a459c9677d1"
};

const firebaseeApp = firebase.initializeApp(firebaseConfig);
const db = firebaseeApp.firestore();

export default db;

