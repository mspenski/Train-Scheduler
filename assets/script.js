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
var firstTrainTime;
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
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  };


  database.ref().push(newTrain);

  $("#name-input").val("")
  $("#destination-input").val("")
  $("#first-input").val("")
  $("#frequency-input").val("")
});

database.ref().on("child_added", function (childSnapshot) {
  var csv = childSnapshot.val();
  firstTrain = csv.firstTrainTime;
  firstTrainTime + csv.frequency

  // console.log(childSnapshot.val().name);
  // console.log(childSnapshot.val().role);
  // console.log(childSnapshot.val().firstTrain);
  // console.log(childSnapshot.val().monthlyRate);

  var startDateFormat = "MM/DD/YYYY";
  var convertedDate = moment(firstTrain, startDateFormat);
  monthsWorked = Math.abs(convertedDate.diff(moment(), "months"));

  var employeeTotalBilled = monthsWorked * childSnapshot.val().monthlyRate

  var tr = $("<tr>");

  var nameTd = $("<td>").text(csv.name);
  var destinationTd = $("<td>").text(csv.destination);
  var frequencyTd = $("<td>").text(csv.frequency);


  // console.log(childSnapshot.val())
  tr.append(nameTd, destinationTd, frequencyTd);

  $("tbody").append(tr);
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


