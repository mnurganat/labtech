import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoViWrtVm45ZNU0Wj04Qe33Vk7wVc_-Kc",
  authDomain: "maulsharif-landing.firebaseapp.com",
  projectId: "maulsharif-landing",
  storageBucket: "maulsharif-landing.firebasestorage.app",
  messagingSenderId: "116884173405",
  appId: "1:116884173405:web:94d8536e524de9685593b4",
  measurementId: "G-CSLECVXDMN",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
