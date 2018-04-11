import * as t from "./actionTypes";
import { AsyncStorage } from "react-native";

let initialState = { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOGIN_SUCCESS:
      console.log("authReducer, action: " + JSON.stringify(action));
      // var user = action.data;
      // console.log("authReducer, user: " + JSON.stringify(user));
      AsyncStorage.setItem("user", JSON.stringify(action.user));
      console.log("end of LOGIN_SUCCESS");
      state = Object.assign({}, state, { isLoggedIn: true, user: action.user });

      return state;
    case t.LOGGED_OUT:
      let keys = ["user"];
      AsyncStorage.multiRemove(keys);
      state = Object.assign({}, state, { isLoggedIn: false, user: null });
      return state;
    default:
      return state;
  }
};

export default authReducer;
