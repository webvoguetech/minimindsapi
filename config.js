import dotenv from "dotenv"
dotenv.config()
import admin  from "firebase-admin";

import serviceAccount from "./assets/minimindschallenge-firebase-adminsdk-qa103-c99ae1d172.json" assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_PATH
});


export const bucket = admin.storage().bucket();