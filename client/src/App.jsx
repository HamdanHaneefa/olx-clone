import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/SignIn/Login";
import SignUp from "./Components/SignUp/Signup";
import { useEffect, useContext} from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
   
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
