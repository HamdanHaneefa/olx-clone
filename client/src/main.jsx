import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import firebase from "./firebase/config.js";
import { FirebaseContext } from "./store/Context.jsx";
import Context from "./store/Context.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FirebaseContext.Provider value={{ firebase }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </BrowserRouter>
);
