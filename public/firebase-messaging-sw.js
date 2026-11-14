// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 13.0.0 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/13.2.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/13.2.0/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAtrbk2AvC6jvRQTYoTK4HpQsRoai4uxUg",
  authDomain: "cargoland-new-applications.firebaseapp.com",
  projectId: "cargoland-new-applications",
  storageBucket: "cargoland-new-applications.firebasestorage.app",
  messagingSenderId: "978352383756",
  appId: "1:978352383756:web:78688c96edb79f7745cb29",
  measurementId: "G-HH0VVNMSE6",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload,
  // );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
