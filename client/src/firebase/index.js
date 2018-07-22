import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID
};

firebase.initializeApp(config);

const ReCaptcha = firebase.auth.RecaptchaVerifier;

const firebaseAuth = firebase.auth();
firebaseAuth.settings.appVerificationDisabledForTesting = true;

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export { firebase, ReCaptcha, firebaseAuth, firestore };
