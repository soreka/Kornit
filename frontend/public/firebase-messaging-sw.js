/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: 'AIzaSyDVOCdc-W0K8qI4HRrD-e1P1v8OKRHsomc',
    authDomain: "notification-1dc26.firebaseapp.com",
    projectId: "notification-1dc26",
    storageBucket: "notification-1dc26.appspot.com",
    messagingSenderId: "351762808913",
    appId: "1:351762808913:web:ac0044a0163c758ac7b870",
    measurementId: "G-LY3QY6E7V4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});
