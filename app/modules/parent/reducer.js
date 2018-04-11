import * as t from "./actionTypes";
import { AsyncStorage } from "react-native";

let initialState = { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  console.log("parentReducer, action: " + JSON.stringify(action));
  switch (action.type) {
    case t.ADD_CHILD:
      AsyncStorage.mergeItem("user", JSON.stringify({ user: action }));
      state = Object.assign({}, state, { user: tutor.push(action) });
      console.log("state: " + state);
      return state;
    case t.ADD_TUTOR:
      AsyncStorage.mergeItem("user", JSON.stringify({ user: action }));
      console.log("end of LOGIN_SUCCESS");
      state = Object.assign({}, state, { user: tutor.push(action) });
      console.log("state: " + state);
      return state;
    default:
      return state;
  }
};

export default authReducer;
