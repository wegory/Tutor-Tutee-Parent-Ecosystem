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

// export function getChildrenUID(callback) {
//   const currentUser = auth.currentUser;
//   database
//     .ref("/users/" + currentUser.uid + "/tutee")
//     .once("value")
//     .then(function(snapshot) {
//       // console.log("snapshot: " + JSON.stringify(snapshot));
//       const exists = snapshot.val() !== null;
//       console.log("exists: " + exists);
//       if (exists) {
//         var uids = snapshot.val();
//         console.log("uids in getChildren: " + JSON.stringify(uids));
//         var keys = Object.keys(uids);
//       }
//       callback(uids);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// export function getChildren() {
//   getChildrenUID(function(uids) {
//     console.log("uids in getChildren!!: " + JSON.stringify(uids));
//     var keys = Object.keys(uids);
//     const childrenPromises = keys.map((key, index) => {
//       database.ref("/users/" + key + "/username").on("value", s => s.val());
//       // .then(function(snapshot) {
//       //   console.log("snapshot: " + JSON.stringify(snapshot.val()));
//       //   snapshot.val();
//       // });
//     });
//     Promise.all(childrenPromises).then(collection => {
//       console.log(JSON.stringify(collection));
//     });
//   });
// }

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
//   database
//     .ref("/users/" + currentUser.uid + "/tutee")
//     .once("value")
//     .then(function(snapshot) {
//       // console.log("snapshot: " + JSON.stringify(snapshot));
//       const exists = snapshot.val() !== null;
//       console.log("exists: " + exists);
//       if (exists) {
//         var uids = snapshot.val();
//         console.log("uids in getChildren: " + JSON.stringify(uids));
//         var keys = Object.keys(uids);
//         keys.map((key, index) => {
//           database
//             .ref("/users/" + key + "/username")
//             .once("value")
//             .then(function(snapshot) {
//               // const exists = snapshot.val() !== null;
//               console.log("snapshot: " + JSON.stringify(snapshot.val()));
//               // console.log("exists: " + exists);
//               // if (exists) {
//               collection[`${key}`] = snapshot.val();
//               // }
//               console.log("collection in API1: " + JSON.stringify(collection));
//             })
//             .catch(error => {
//               console.log(error);
//             });
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   console.log("collection in API2: " + JSON.stringify(collection));
//   return collection;
// }
