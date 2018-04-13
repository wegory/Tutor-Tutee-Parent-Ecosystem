import * as t from "./actionTypes";
import * as api from "./api";
// import { auth } from "../../config/firebase";

// import { AsyncStorage } from "react-native";

export function addChild(data, successCB, errorCB) {
  console.log("addChild from action");
  console.log("in actions, addChild, data: " + JSON.stringify(data));
  return dispatch => {
    api.addChild(data.addToken, function(success, data, error) {
      console.log("in actions, addChild, within function");
      if (success) {
        console.log("addChild Successful");
        dispatch({ type: t.ADD_CHILD, tutee: data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function addTutor(data, successCB, errorCB) {
  console.log("addTutor from action");
  console.log("in actions, addTutor, data: " + JSON.stringify(data));
  return dispatch => {
    api.addTutor(data, function(success, data, error) {
      console.log("in actions, addTutor, within function");
      if (success) {
        console.log("addTutor Successful");
        dispatch({ type: t.ADD_TUTOR, tutor: data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

// export function getChildren() {
//   console.log("getChildren from action");
//   api.getChildren(function(collection) {
//     return collection;
//   });
// }
