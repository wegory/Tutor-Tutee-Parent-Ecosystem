import { combineReducers } from "redux";

import { reducer as authReducer } from "../modules/auth";
import { reducer as tutorReducer } from "../modules/tutor";
import { reducer as tuteeReducer } from "../modules/tutee";
import { reducer as parentReducer } from "../modules/parent";
// Combine all the reducers
const rootReducer = combineReducers({
  authReducer,
  tutorReducer,
  tuteeReducer,
  parentReducer
});

export default rootReducer;
