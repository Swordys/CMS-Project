import firebase from "firebase";
import myFirebase from "./firebase";

export default new firebase.auth.FacebookAuthProvider();

myFirebase
  .auth()
  .getRedirectResult()
  .then(result => {
    if (result.credential) {
      const token = result.credential.accesToken;
    }
    const user = result.user;
    console.log(user);
  })
  .catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
