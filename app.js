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
let fundraisertest = [];
let top3 = [];
let nytest = document.querySelector("#userDonation");
let fundraiser = [];
let fyn = [];
let jylland = [];
let sjaelland = [];
let blankets = [];
let cloth = [];
let dogBlankets = [];
let basket = [];
let toys = [];
let sum;
let fullAmount = [];
let moneyAmount = 0;
let donations = [];
let ormekur = [];
let loppekur = [];
let hundegodbidder = [];
let hundefoder = [];
let menuOption = document.querySelector(".menu");
const form = document.querySelector("#add-cafe-form");

function indexInit() {
  var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  document.querySelector(".donation").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".penge").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".tekstil").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".foder").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  db.collection("donations")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        donations.push(doc.data());
      });
      count();
      test();
      setInterval(function() {
        if (form.amount.value.length > 0) {
          document.querySelector("#betalingDropdown").style.display = "block";
        } else {
          document.querySelector("#betalingDropdown").style.display = "none";
        }
      }, 100);
    });
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "none";
  });
  // med limits (kun 1 visning den nyeste )
  db.collection("donations")
    .orderBy("date", "desc")
    .limit(1)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        fundraisertest.push(doc.data());
      });
      document.querySelector(".person").innerHTML =
        fundraisertest[0].firstname +
        "<br>" +
        fundraisertest[0].amount +
        fundraisertest[0].attend +
        fundraisertest[0].textil;
    });

  db.collection("fundraise")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        fundraiser.push(doc.data());
      });
      document.querySelector(".goal").textContent = fundraiser[0].goal + " DKK";
    });

  // saving data
  form.addEventListener("submit", e => {
    e.preventDefault();

    document.querySelector("#giveDonation").addEventListener("click", () => {
      if (form.annonym.checked == true) {
        console.log("jeg er checked");

        db.collection("donations").add({
          firstname: "annonym",
          lastname: form.lastname.value,
          email: form.email.value,
          country: form.country.value,
          amount: form.amount.value,
          attend: form.pleje.value,
          textil: form.textil.value,
          date: today
        });
      } else if (form.annonym.checked == false) {
        console.log("jeg er ikke checked");
        db.collection("donations").add({
          firstname: form.name.value,
          lastname: form.lastname.value,
          email: form.email.value,
          country: form.country.value,
          amount: form.amount.value,
          attend: form.pleje.value,
          textil: form.textil.value,
          date: today
        });
      }

      document.querySelector("#add-cafe-form").style.display = "none";
      document.querySelector(".done").style.display = "grid";
      setTimeout(function() {
        window.location.replace("index.html");
      }, 10000);
    });
  });
}

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

function count() {
  donations.forEach(amount => {
    if (amount.amount > 0) {
      fullAmount.push(amount.amount);
    }
  });
}

function test() {
  fullAmount.forEach(sum => {
    moneyAmount = moneyAmount + parseInt(fullAmount);
  });
  document.querySelector(".indsamlet").textContent = moneyAmount + " DKK";
}

function showPayment() {
  if ((form.amount.value = "11")) {
    console.log("test test test");
  }
}
