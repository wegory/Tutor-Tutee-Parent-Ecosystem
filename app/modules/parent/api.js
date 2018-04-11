import * as firebase from "firebase";
import { auth, database, provider } from "../../config/firebase";

export function addChild(pseudoKey, callback) {
  const currentUser = auth.currentUser;
  database
    .ref("addChildKey")
    .child(pseudoKey)
    .once("value")
    .then(function(snapshot) {
      const uid = snapshot.uid;
      const updates = {};
      updates["/users/" + uid + "/parent/"] = currentUser.uid;
      updates["/users/" + currentUser.uid + "/tutee/"] = uid;
      database.ref("user").child(uid);
      database.ref().update(updates);
      callback(true, uid, null);
    })
    .catch(error => callback(false, null, error));
}
