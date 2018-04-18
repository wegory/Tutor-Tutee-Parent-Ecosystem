import * as t from "./actionTypes";
import * as api from "./api";
import { auth } from "../../config/firebase";

// import { AsyncStorage } from "react-native";

export function addAssignment(data, successCB, errorCB) {
  api.addAssignment(data, function(success, error) {
    if (success) {
      console.log("addAssignment Successful");
      successCB();
    } else if (error) errorCB(error);
  });
}
