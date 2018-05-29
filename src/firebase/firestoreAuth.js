import firebase from "firebase/app";
import "firebase/auth";

firebase.auth().settings.appVerificationDisabledForTesting = true;

export default firebase;
