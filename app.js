"use strict";

// Initialize Firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlX_GGgndMgG1aL7_sTqZu9IpkpxjVKAg",
  authDomain: "fundraising-b94fd.firebaseapp.com",
  databaseURL: "https://fundraising-b94fd.firebaseio.com",
  projectId: "fundraising-b94fd",
  storageBucket: "fundraising-b94fd.appspot.com",
  messagingSenderId: "737157633656"
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
