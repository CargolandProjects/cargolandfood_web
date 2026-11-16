"use client";

import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  // onRegistered,
  // register,
} from "firebase/messaging";
import { notification } from "@/lib/services/notification.service";
import { useEffect } from "react";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async () => {
  // Notification.requestPermission();
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });
  notification.registerDevice(token);
  // console.log("Notification Token:", token);s
};

const FirebaseClient = () => {
  useEffect(() => {
    generateToken();
    const unSubscribe = onMessage(messaging, (payload) => {
      toast.info(payload.notification?.title, {
        description: payload.notification?.body,
      });
      // console.log("Notification received. ", payload.notification?.body);
    });

    return () => unSubscribe();
  }, []);

  return null;
};

export default FirebaseClient;
