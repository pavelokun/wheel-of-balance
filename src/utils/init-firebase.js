import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }

const firebaseConfig = {
  apiKey: "AIzaSyCv-0WrsW62W7ofh0x6_dX_CQv58QGAE2w",
  authDomain: "wheel-of-balance-2257d.firebaseapp.com",
  projectId: "wheel-of-balance-2257d",
  storageBucket: "wheel-of-balance-2257d.appspot.com",
  messagingSenderId: "799103876050",
  appId: "1:799103876050:web:4d9540315fa40d570d660b",
  measurementId: "G-NDBSLM7J6N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
