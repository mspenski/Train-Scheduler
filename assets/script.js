// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA69CHoGtRdKVL49HbkJoR2RMC-iNQ51a0",
    authDomain: "train-scheduler-23462.firebaseapp.com",
    databaseURL: "https://train-scheduler-23462.firebaseio.com",
    projectId: "train-scheduler-23462",
    storageBucket: "",
    messagingSenderId: "548368815635"
  };

  firebase.initializeApp(config);

  //Variable for database
  var database = firebase.database();

  var trainInfo = {
      name: ["test", "test"],
      destination: ["test"],
      first: ["test"],
      frequency: ["test"]
  };

  database.ref().set({
      trainName: trainInfo.name,
      trainDestination: trainInfo.destination,
      trainFirstTime: trainInfo.first,
      trainFrequency: trainInfo.frequency
  });

  database.ref('/').on("value", function(snapshot) {
    console.log(snapshot);

    for (var i=0; i< trainInfo.name.length; i++) {
        var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var trainNameTd = $("<td>").text(snapshot.val().trainName);
    var trainDestinationTd = $("<td>").text(snapshot.val().trainDestination);
    var trainFirstTimeTd = $("<td>").text(snapshot.val().trainFirstTime);
    var trainFrequencyTd = $("<td>").text(snapshot.val().trainFirstTime);

    // Append the newly created table data to the table row
    tRow.append(
      trainNameTd,
      trainDestinationTd,
      trainFirstTimeTd,
      trainFrequencyTd
    );
    // Append the table row to the table body
    $("tbody").append(tRow);
    }
    });

    
