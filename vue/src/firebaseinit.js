import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCVoR-PzMWYOtR-wWCzj8DAlCCqy7luUC8",
    authDomain: "codewars-leaderboard-1.firebaseapp.com",
    databaseURL: "https://codewars-leaderboard-1.firebaseio.com",
    projectId: "codewars-leaderboard-1",
    storageBucket: "codewars-leaderboard-1.appspot.com",
    messagingSenderId: "1029706540446",
    appId: "1:1029706540446:web:feb7250d9f7d4dd11ba28f",
    measurementId: "G-YEP4J2PHSP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;