import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";

export function addChild(token, callback) {
  const currentUser = auth.currentUser;
  // console.log("addChild in api");
  // console.log("currentUser: " + JSON.stringify(currentUser));
  // console.log("token: " + token);
  database
    .ref("/addChildKey/" + token)
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + JSON.stringify(snapshot));
      // console.log("uid: " + uid);
      const exists = snapshot.val() !== null;
      if (exists) {
        var uid = snapshot.val().uid;
        console.log("uid: " + uid);
        database
          .ref("/users/" + currentUser.uid + "/tutee/")
          .child(uid)
          .once("value")
          .then(function(snapshot) {
            const exists = snapshot.val() !== null;
            if (!exists) {
              database
                .ref("/users/" + uid + "/parent/" + currentUser.uid)
                .set(true);
              database
                .ref("/users/" + currentUser.uid + "/tutee/" + uid)
                .set(true);
            }
            callback(true, uid, null);
          });
      }
    })
    .catch(error => {
      console.log(error);
      callback(false, null, error);
    });
}

export function addTutor(data, callback) {
  const currentUser = auth.currentUser;
  console.log("addTutor data: " + JSON.stringify(data));
  const tuteeUID = data.child;
  const tutorToken = data.TutorToken;
  console.log("addTutor in api");
  // console.log("currentUser: " + JSON.stringify(currentUser));
  console.log("tuteeUID: " + tuteeUID + ", tutorToken: " + tutorToken);
  database
    .ref("/addTutorKey/" + tutorToken)
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + JSON.stringify(snapshot));
      // console.log("uid: " + uid);
      const exists = snapshot.val() !== null;
      if (exists) {
        var tutorUID = snapshot.val().uid;
        console.log("tutorUID: " + tutorUID);
        database
          .ref("/users/" + currentUser.uid + "/tutor/" + tutorUID)
          .set(true);
        database
          .ref("/users/" + tutorUID + "/parent/" + currentUser.uid)
          .set(true);
        database.ref("/users/" + tutorUID + "/tutee/" + tuteeUID).set(true);
        database.ref("/users/" + tuteeUID + "/tutor/" + tutorUID).set(true);
      }
      callback(true, tutorUID, null);
    })
    .catch(error => {
      console.log(error);
      callback(false, null, error);
    });
}

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
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function checkAssignmentChanges(childUID, callback) {
  console.log("checkChanges");
  database.ref("/assignment/" + childUID).on("value", () => {
    console.log("changed");
    callback(true);
  });
}

export function checkChildChanges(callback) {
  const currentUser = auth.currentUser;
  console.log("checkChanges");
  database.ref("/users/" + currentUser.uid + "/tutee/").on("value", () => {
    console.log("changed");
    callback(true);
  });
}

export function getAssignments(childUID, callback) {
  console.log("getAssigments");
  const currentUser = auth.currentUser;
  database
    .ref("/assignment/" + childUID)
    .once("value")
    .then(function(snapshot) {
      // console.log("snapshot: " + snapshot.val());
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        callback(snapshot.val());
      }
      callback(null);
    })
    .catch(error => {
      console.log(error);
    });
}

export function getTutorsForDisplay(childUID, callback) {
  console.log("getTutorsForDisplay API");
  console.log("childUID: " + childUID);
  database
    .ref("/users/" + childUID + "/tutor/")
    .once("value")
    .then(function(snapshot) {
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        var uids = snapshot.val();
        console.log("uids in getTutors: " + JSON.stringify(uids));
        var keys = Object.keys(uids);
        var collection = {};
        const keysLen = keys.length;
        keys.map((key, index) => {
          database
            .ref("/users/" + key)
            .once("value")
            .then(function(snapshot) {
              console.log("snapshot: " + JSON.stringify(snapshot.val()));
              collection[`${key}`] = snapshot.val();
              console.log(
                "collection in API getTutorsForDisplay: " +
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
      }
      callback(null);
    })
    .catch(error => {
      console.log(error);
    });
}

export function addTuition(data, callback) {
  console.log("addTuition: " + JSON.stringify(data));
  const currentUser = auth.currentUser;
  const tuteeRef = database
    .ref("/tuition/" + data.childUID + "/" + data.tutorUID)
    .push(data);
  var parentKey = tuteeRef.key;
  var parentRef = database
    .ref("/tuition/" + currentUser.uid + "/" + parentKey)
    .set(data);
  tuteeRef
    .then(() => parentRef.then(() => callback(true))) //return
    .catch(callback(false));
}

export function checkSessionChanges(callback) {
  console.log("checkSessionChanges");
  const currentUser = auth.currentUser;
  database.ref("/tuition/" + currentUser.uid).on("value", () => {
    console.log("sessionschanged");
    callback(true);
  });
}

export function getSessions(callback) {
  console.log("getSessions");
  const currentUser = auth.currentUser;
  database
    .ref("/tuition/" + currentUser.uid)
    .once("value")
    .then(function(snapshot) {
      const exists = snapshot.val() !== null;
      console.log("exists: " + exists);
      if (exists) {
        callback(snapshot.val());
      }
      callback(null);
    })
    .catch(error => {
      console.log(error);
    });
}
