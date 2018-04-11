import * as t from "./actionTypes";
import * as api from "./api";
import { auth } from "../../config/firebase";

import { AsyncStorage } from "react-native";

export function addChild(data) {
  return dispatch => {
    api.addChild(function(data, success, error) {
      if (success) {
        console.log("addChild Successful");
        dispatch({ type: t.ADD_CHILD, user: data });
      } else if (error) errorCB(error);
    });
  };
}
