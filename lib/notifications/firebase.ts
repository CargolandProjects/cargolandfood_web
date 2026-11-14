// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  // onRegistered,
  // register,
} from "firebase/messaging";
import { notification } from "../services/notification.service";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cargoland-new-applications.firebaseapp.com",
  projectId: "cargoland-new-applications",
  storageBucket: "cargoland-new-applications.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// onRegistered(messaging,  (installationId) => {
//   console.log("Registered installation ID:", installationId);

//   // Send the Firebase Installation ID to your app server and update the UI if needed.
//   notification.registerDevice(installationId);
// });

// register(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
// const analytics = getAnalytics(app);

// console.log("Firebase VAPID key: ", process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY);

export const generateToken = async () => {
  // Notification.requestPermission();
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });
  notification.registerDevice(token);
  // console.log("Notification Token:", token);s
};
