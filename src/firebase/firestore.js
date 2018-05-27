import { initializeApp, firestore } from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID
};

initializeApp(config);
const FIREDB = firestore();
FIREDB.settings({ timestampsInSnapshots: true });
export default FIREDB;
