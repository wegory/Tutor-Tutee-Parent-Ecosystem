import * as t from "./actionTypes";
import { AsyncStorage } from "react-native";

let initialState = { tutee: null, tutor: null };

const parentReducer = (state = initialState, action) => {
  console.log("parentReducer, action: " + JSON.stringify(action));
  switch (action.type) {
    case t.ADD_CHILD:
      AsyncStorage.mergeItem(
        "user",
        JSON.stringify({ user: { tutee: action.tutee } })
      );
      console.log("state: " + JSON.stringify(state));
      state = Object.assign({}, state, { tutee: action.tutee });
      return state;
    case t.ADD_TUTOR:
      AsyncStorage.mergeItem(
        "user",
        JSON.stringify({ user: { tutor: action.tutor } })
      );
      console.log("state: " + JSON.stringify(state));
      state = Object.assign({}, state, { tutor: action.tutor });
      return state;
    default:
      return state;
  }
};

export default parentReducer;
