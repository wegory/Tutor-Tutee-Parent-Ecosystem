import * as t from "./actionTypes";
import * as api from "./api";
import { auth } from "../../config/firebase";

import { AsyncStorage } from "react-native";

export function register(data, successCB, errorCB) {
  return dispatch => {
    api.register(data, function(success, data, error) {
      if (success) successCB(data);
      else if (error) errorCB(error);
    });
  };
}

export function createUser(user, successCB, errorCB) {
  return dispatch => {
    api.createUser(user.uid, user, function(success, data, error) {
      if (success) {
        data = { exists: true, user: data };
        dispatch({ type: t.LOGIN_SUCCESS, user: data });
        console.log(
          "dispatched after completeProfile, data: " + JSON.stringify(data)
        );
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}

export function login(data, successCB, errorCB) {
  return dispatch => {
    api.login(data, function(success, data, error) {
      if (success) {
        console.log("login data:" + JSON.stringify(data));
        if (data.exists) dispatch({ type: t.LOGIN_SUCCESS, user: data });
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}

export function resetPassword(data, successCB, errorCB) {
  return dispatch => {
    api.resetPassword(data, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}

export function signOut(successCB, errorCB) {
  return dispatch => {
    api.signOut(function(success, data, error) {
      if (success) {
        dispatch({ type: t.LOGGED_OUT });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function checkLoginStatus(callback) {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      let isLoggedIn = user !== null;
      if (isLoggedIn) {
        //get the user object from the Async storage
        AsyncStorage.getItem("user", (err, user) => {
          console.log("checkLoginStatus: " + JSON.stringify(user));
          if (user === null)
            isLoggedIn = false; //set the loggedIn value to false
          else dispatch({ type: t.LOGIN_SUCCESS, user: JSON.parse(user) });
          callback(isLoggedIn);
        });
      } else {
        dispatch({ type: t.LOGGED_OUT });
        callback(isLoggedIn);
      }
    });
  };
}

export function signInWithFacebook(facebookToken, successCB, errorCB) {
  return dispatch => {
    api.signInWithFacebook(facebookToken, function(success, data, error) {
      console.log("actions success?:");
      console.log(success);
      if (success) {
        dispatch({ type: t.LOGIN_SUCCESS, user: data });
        console.log("actions dispatched");
        console.log("dispatched data: " + JSON.stringify(data));
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}
