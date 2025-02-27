import { initializeApp } from "firebase/app";
import 'firebase/auth' 


const firebaseConfig = {
    apiKey: "AIzaSyAJQaeGAfaWINL7xiEvCdQ99qYhNUH5X1Y",
    authDomain: "olx-clone-a744e.firebaseapp.com",
    projectId: "olx-clone-a744e",
    storageBucket: "olx-clone-a744e.firebasestorage.app",
    messagingSenderId: "554959617808",
    appId: "1:554959617808:web:2e2ec4817e96708fa3ef95"
};


const app = initializeApp(firebaseConfig);

export default app;
