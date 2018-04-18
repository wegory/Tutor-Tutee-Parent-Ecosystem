// import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";
// import { addAssignment } from "./actions";

export function getAssignments(callback) {
  const currentUser = auth.currentUser;
  console.log("getAssignments API");
  database
    .ref("/assignment/" + currentUser.uid)
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

export function checkChanges(callback) {
  console.log("checkChanges");
  const currentUser = auth.currentUser;
  database.ref("/assignment/" + currentUser.uid).on("value", () => {
    console.log("changed");
    callback(true);
  });

  // database
  //   .ref("/assignment/")
  //   .child(currentUser.uid)
  //   .then(console.log("hi"))
  // .on("value", snapshot => {
  //   const myData = snapshot.val();
  //   callback(true);
  // })
  // .catch(error => console.log(error));
}

export function doneDeal(assignmentUID, tutorUID) {
  const currentUser = auth.currentUser;
  database
    .ref("/assignment/" + currentUser.uid + "/" + assignmentUID)
    .update({ done: true });

  database
    .ref(
      "/assignment/" + tutorUID + "/" + currentUser.uid + "/" + assignmentUID
    )
    .update({ done: true });
}
