// /scripts/firebase-config.js
// Firebase конфигурация
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "beer-58b91.firebaseapp.com",
    databaseURL: "https://beer-58b91-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "beer-58b91",
    storageBucket: "beer-58b91.appspot.com",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
