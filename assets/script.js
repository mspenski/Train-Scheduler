// Initialize Firebase
var config = {
  apiKey: "AIzaSyA69CHoGtRdKVL49HbkJoR2RMC-iNQ51a0",
  authDomain: "train-scheduler-23462.firebaseapp.com",
  databaseURL: "https://train-scheduler-23462.firebaseio.com",
  projectId: "train-scheduler-23462",
  storageBucket: "train-scheduler-23462.appspot.com",
  messagingSenderId: "548368815635"
};
firebase.initializeApp(config);

// Variables
var database = firebase.database();
var TrainName;
var destination;
var frequency;
var minutesAway;
var nextArrival;

// Function for submit button
$("#submit").on("click", function (event) {
  event.preventDefault();

  var newTrain = {
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    firstTrain: $("#first-input").val().trim(),
    frequency: $("#frequency-input").val().trim(),
  };

  database.ref().push(newTrain);
  //empties inputs on submit
  $("#name-input").val("")
  $("#destination-input").val("")
  $("#first-input").val("")
  $("#frequency-input").val("")
});

database.ref().on("child_added", function (childSnapshot) {
  var csv = childSnapshot.val();
  firstTrain = csv.firstTrain;

  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 
  // Time apart (remainder)
  var tRemainder = diffTime % csv.frequency;

  // Minutes Until Train
  var minutesAway = csv.frequency - tRemainder;

  // Next Train
  var nextArrival = moment().add(minutesAway, "minutes");

  var tr = $("<tr>");

  var nameTd = $("<td>").text(csv.name);
  var destinationTd = $("<td>").text(csv.destination);
  var frequencyTd = $("<td>").text(csv.frequency);
  var minutesAwayTd = $("<td>").text(moment(nextArrival).format("hh:mm a"));
  var nextArrivalTd = $("<td>").text(minutesAway);

  // Appends to the table
  tr.append(nameTd, destinationTd, frequencyTd, minutesAwayTd, nextArrivalTd);
  
  $("tbody").append(tr);
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


