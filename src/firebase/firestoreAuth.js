import firebase from "firebase/app";
import "firebase/auth";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("LOGGED IN");
  } else {
    console.log("LOGGED OUT");
  }
});

export default firebase;
