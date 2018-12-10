"use strict";

// Initialize Firebase

var config = {
  apiKey: "AIzaSyCjVw4AfA75wRqi4AQlpl63Cp7QfqoluoI",
  authDomain: "fundraiser-31fa4.firebaseapp.com",
  databaseURL: "https://fundraiser-31fa4.firebaseio.com",
  projectId: "fundraiser-31fa4",
  storageBucket: "fundraiser-31fa4.appspot.com",
  messagingSenderId: "260126617633"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logonButton = document.querySelector("#login");

function login() {
  logonButton.addEventListener("click", () => {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (
            username.value == doc.data().username &&
            password.value == doc.data().password
          ) {
            window.location.href = "dashboard.html";
            //console.log("vi er inde");

            return;
          } else {
            console.log("incorrect username or password");
          }
        });
      });
  });
}
