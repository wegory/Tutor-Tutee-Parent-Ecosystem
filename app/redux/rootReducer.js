import { combineReducers } from "redux";

import { reducer as authReducer } from "../modules/auth";
import { reducer as tutorMainReducer } from "../modules/tutor";
import { reducer as tuteeMainReducer } from "../modules/tutee";
import { reducer as parentMainReducer } from "../modules/parent";
// Combine all the reducers
const rootReducer = combineReducers({
  authReducer,
  tutorMainReducer,
  tuteeMainReducer,
  parentMainReducer
});

export default rootReducer;
