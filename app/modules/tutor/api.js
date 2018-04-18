import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";

export function getChildrenForDisplay(callback) {
  const currentUser = auth.currentUser;
  database
    .ref("/users/" + currentUser.uid + "/tutee")
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + JSON.stringify(snapshot));
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        var uids = snapshot.val();
        console.log("uids in getChildren: " + JSON.stringify(uids));
        var keys = Object.keys(uids);
        var collection = {};
        const keysLen = keys.length;
        keys.map((key, index) => {
          database
            .ref("/users/" + key)
            .once("value")
            .then(function(snapshot) {
              // const exists = snapshot.val() !== null;
              console.log("snapshot: " + JSON.stringify(snapshot.val()));
              // console.log("exists: " + exists);
              // if (exists) {
              collection[`${key}`] = snapshot.val();
              // }
              console.log(
                "collection in API getChildrenForDisplay: " +
                  JSON.stringify(collection)
              );
              if (keysLen === index + 1) {
                callback(collection);
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      } else {
        callback(collection);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// Edit getAssignments
// Add profileImage of tutor when assigning hw?

export function getChildren(callback) {
  const currentUser = auth.currentUser;
  database
    .ref("/users/" + currentUser.uid + "/tutee")
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + JSON.stringify(snapshot));
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        var uids = snapshot.val();
        console.log("uids in getChildren: " + JSON.stringify(uids));
        var keys = Object.keys(uids);
        var collection = {};
        const keysLen = keys.length;
        keys.map((key, index) => {
          database
            .ref("/users/" + key + "/username")
            .once("value")
            .then(function(snapshot) {
              // const exists = snapshot.val() !== null;
              console.log("snapshot: " + JSON.stringify(snapshot.val()));
              // console.log("exists: " + exists);
              // if (exists) {
              collection[`${key}`] = snapshot.val();
              // }
              console.log("collection in API1: " + JSON.stringify(collection));
              if (keysLen === index + 1) {
                callback(collection);
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function addAssignment(data, callback) {
  console.log("addAssignment: " + JSON.stringify(data));
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  const currentUser = auth.currentUser;
  const currentUsername = data.username;
  console.log("currentUser: " + JSON.stringify(currentUser));
  const tuteeUID = data.tuteeUID;
  const assignment = data.Assignment;
  const dueDate = data.date;
  const profileImage = data.profileImage;
  var assignmentObject = {
    assignment: assignment,
    dueDate: data.date,
    assignedDate: today,
    tutor: {
      uid: currentUser.uid,
      username: currentUsername,
      profileImage: profileImage
    },
    done: false
  };
  console.log("assignmentObject: " + JSON.stringify(assignmentObject));
  var tuteeRef = database.ref("/assignment/" + tuteeUID).push(assignmentObject);
  var assignmentKey = tuteeRef.key;
  var currentUserRef = database
    .ref(
      "/assignment/" + currentUser.uid + "/" + tuteeUID + "/" + assignmentKey
    )
    .set(assignmentObject);
  tuteeRef
    .then(() => currentUserRef.then(() => callback(true, null))) //return
    .catch(error => callback(false, { message: error }));
}

export function getAssignments(tuteeUID, callback) {
  const currentUser = auth.currentUser;
  database
    .ref("/assignment/" + currentUser.uid + "/" + tuteeUID)
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + JSON.stringify(snapshot));
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        var assignments = snapshot.val();
        console.log(
          "assignments in getAssignment: " + JSON.stringify(assignments)
        );
        callback(assignments);
      } else {
        callback(null);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function checkAssignmentChanges(tuteeUID, callback) {
  const currentUser = auth.currentUser;
  console.log("checkChanges");
  database
    .ref("/assignment/" + currentUser.uid + "/" + tuteeUID)
    .on("value", () => {
      console.log("changed");
      callback(true);
    });
}
