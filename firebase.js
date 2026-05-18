import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_DOMAIN",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_BUCKET",

  messagingSenderId: "YOUR_SENDER",

  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export { signInAnonymously };
