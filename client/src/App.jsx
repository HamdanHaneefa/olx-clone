import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/SignIn/Login";
import SignUp from "./Components/SignUp/Signup";
import Create from "./Components/Create/Create";
import ProductView from "./pages/SingleProduct";
import { useEffect, useContext} from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./store/ProtectedRoute";
import PublicRoute from "./store/PublicRoute";
import Post from "./store/PostContext";

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
 
  useEffect(() => {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    }, [setUser]);
   
  })
  return (
    <>
    <Post>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<PublicRoute> <SignUp /> </PublicRoute>} />
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/create" element={<ProtectedRoute> <Create/> </ProtectedRoute>} />
          <Route path="/view" element={<ProductView/>} />
      </Routes>
    </Post>
    </>
  );
}

export default App;
