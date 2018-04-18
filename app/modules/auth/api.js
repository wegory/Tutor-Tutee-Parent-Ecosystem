import axios from "axios";

import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) {
  console.log("register, createUserWithEmailAndPassword");
  const { email, password } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => callback(true, user, null))
    .catch(error => callback(false, null, error));
}

//Sign the user in with their email and password
export function login(data, callback) {
  const { email, password } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => getUser(user, callback))
    .catch(error => callback(false, null, error));
  console.log(data);
}

//Get the user object from the realtime database
export function getUser(user, callback) {
  console.log("called getUser");
  database
    .ref("users")
    .child(user.uid)
    .once("value")
    .then(function(snapshot) {
      const exists = snapshot.val() !== null;
      //if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) user = snapshot.val();
      // console.log(exists);
      // console.log(user);
      const data = { exists, user };
      callback(true, data, null);
    })
    .catch(callback(false, null, "Your child is already added!"));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
  const { email } = data;
  auth
    .sendPasswordResetEmail(email)
    .then(user => callback(true, null, null))
    .catch(error => callback(false, null, error));
}

export function signOut(callback) {
  auth
    .signOut()
    .then(() => {
      if (callback) callback(true, null, null);
    })
    .catch(error => {
      if (callback) callback(false, null, error);
    });
}

export function signInWithFacebook(fbToken, callback) {
  var api = `https://graph.facebook.com/me?fields=id,first_name,last_name,gender,birthday&access_token=${fbToken}`;
  axios
    .get(api)
    .then(res => res.data)
    .then(fbData => {
      console.log(fbData);
      fbData["token"] = fbToken;
      fbData["profileImage"] = `https://graph.facebook.com/${
        fbData.id
      }/picture?type=large`;
      this.signIn(fbData, callback);
    })
    .catch(error => callback(false, null, { message: error }));
}

//Sign the user in
export function signIn(fbData, callback) {
  console.log("fbData.token: " + fbData.token);
  // const credential = provider.credential(fbData.token);
  const credential = firebase.auth.FacebookAuthProvider.credential(
    fbData.token
  );
  console.log("sign in credentials: " + JSON.stringify(credential));
  auth
    .signInWithCredential(credential)
    // .catch(error => console.log("error: " + error));
    .then(user => this.checkUserExist(user, fbData, callback))
    .catch(error => callback(false, null, { message: error }));
}

export function createUser(userId, data, callback) {
  console.log("createUser: ");
  // console.log("userId: " + userId);
  // console.log(JSON.stringify(data));
  const date = new Date();
  const now = date.getTime().toString();
  console.log("now: " + now);
  const lastFour = now.slice(-4);
  const midFour = now.slice(5, 9);
  // console.log("last Four: " + lastFour + "\nmidFour: " + midFour);
  const addThem = (+lastFour + +midFour) % 1000;
  const username =
    data.username != undefined ? data.username.replace(/\s+/g, "") : null;
  const combine =
    data.username != undefined ? username + addThem.toString() : null;
  // console.log(combine);
  const create = {};
  if (data.role === undefined) {
    database
      .ref("users")
      .child(userId)
      .set({ ...data })
      .then(() => callback(true, data, null))
      .catch(error => callback(false, null, { message: error }));
  } else if (data.role === "tutee") {
    // data["assignment"] = [];
    // data["parent"] = [];
    // data["tutor"] = [];
    // data["tuition"] = [];
    data["addTuteeKey"] = combine;
    database
      .ref("addChildKey")
      .child(combine)
      .set({ uid: data.uid })
      .then(
        database
          .ref("users")
          .child(userId)
          .set({ ...data })
          .catch(error => callback(false, null, { message: error }))
      )
      .then(() => callback(true, data, null))
      .catch(error => callback(false, null, { message: error }));
  } else if (data.role === "parent") {
    // data["tutee"] = [];
    // data["tutor"] = [];
    // data["tuition"] = [];
    // data["payment"] = [];
    database
      .ref("users")
      .child(userId)
      .set({ ...data })
      .then(() => callback(true, data, null))
      .catch(error => callback(false, null, { message: error }));
  } else {
    // data["assignment"] = [];
    // data["parent"] = [];
    // data["tutee"] = [];
    // data["tuition"] = [];
    // data["payment"] = [];
    data["addTutorKey"] = combine;
    database
      .ref("addTutorKey")
      .child(combine)
      .set({ uid: data.uid })
      .then(
        database
          .ref("users")
          .child(userId)
          .set({ ...data })
          .catch(error => callback(false, null, { message: error }))
      )
      .then(() => callback(true, data, null))
      .catch(error => callback(false, null, { message: error }));
  }

  // database
  //   .ref("users")
  //   .child(userId)
  //   .set({ ...data })
  //   .then(() => callback(true, data, null))
  //   .catch(error => callback(false, null, { message: error }));
}

//Check if the user exist in the realtime database
export function checkUserExist(user, fbData, callback) {
  console.log("checkUserExist");
  console.log("user: ");
  console.log("fbData " + JSON.stringify(fbData));
  console.log(user.email);
  database
    .ref("/users/" + user.uid)
    .once("value")
    .then(function(snapshot) {
      console.log("checkUserExist, before database");
      console.log(user.displayName);
      // var exists = snapshot.val() === null ? false : true;
      console.log("snapshot: " + JSON.stringify(snapshot));
      var exists = snapshot.val() === null ? false : true;
      exists = exists
        ? typeof snapshot.val().username === "undefined" ? false : true
        : false;
      if (exists) {
        var data = {
          newUser: !exists,
          user: snapshot
        };
        callback(true, data, null);
      } else {
        fbData.uid = user.uid;
        fbData.email = user.email;
        // fbData.profileImage = user.profileImage;
        var data = {
          newUser: !exists,
          user: fbData
        };
        console.log("checkUserExist, database");
        console.log("exists: " + exists);
        console.log(data);
        createUser(user.uid, data, callback);
      }
    })
    .catch(error => callback(false, null, { message: error }));
}
