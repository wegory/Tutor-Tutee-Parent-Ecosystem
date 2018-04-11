// import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";
// import { addAssignment } from "./actions";

export function addAssignment(callback) {
  database
    .ref("assignment")
    .set({ hw1: "hi" })
    .then(() => callback(true, null)) //return
    .catch(error => callback(false, { message: error }));
  //   database
  //     .ref("users")
  //     .once("value")
  //     .set({ hw1: "hi" })
  //     .then(() => callback(true, null)) //return
  //     .catch(error => callback(false, { message: error }));
}
