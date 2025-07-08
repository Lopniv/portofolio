import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCupqK2hfnJGFxOhZYubbIitsMqA1JT7ns",
	authDomain: "lopniv-4d637.firebaseapp.com",
	projectId: "lopniv-4d637",
	storageBucket: "lopniv-4d637.firebasestorage.app",
	messagingSenderId: "717155824417",
	appId: "1:717155824417:web:f18ad2d5750bb8a2310460",
	measurementId: "G-MEKQFVZESC",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
