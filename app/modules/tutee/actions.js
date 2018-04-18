import * as t from "./actionTypes";
import * as api from "./api";
import { auth } from "../../config/firebase";

// import { AsyncStorage } from "react-native";

export function addAssignments() {
  api.addAssignment(function(success, error) {
    if (success) {
      console.log("addAssignment Successful");
    } else if (error) errorCB(error);
  });
}
