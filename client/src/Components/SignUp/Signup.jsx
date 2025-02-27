import './Signup.css'
import { Link } from "react-router-dom";
import OlxLogo from '../../assets/OlxLogo.jsx';
import { useState, useContext } from "react";
import { FirebaseContext } from '../../store/Context.jsx';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const db = getFirestore(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      await addDoc(collection(db, 'users'), {
        id: user.uid,
        username: username,
        phone: phone
      });

      console.log("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error Code:", error.code);
      alert("Error Message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-body">
          <div className="logo">
            <Link to="/">
              <OlxLogo></OlxLogo>
            </Link>
          </div>

          <h1>Create a new account</h1>

          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            className="input-field"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit} className="signup-button" disabled={loading}>
            {loading ? <div className="loader"></div> : "Sign Up"}
          </button>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>

          <p className="privacy-notice">
            By signing up, you agree to our Terms of Use and Privacy Policy.
            Your information is never shared with external parties.
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
