import './Login.css'
import { Link } from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo.jsx';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context.jsx';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-body">
          <div className="logo">
            <Link to="/">
              <OlxLogo />
            </Link>
          </div>

          <h1>Enter your credentials to login</h1>

          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="alert">
            If you are a new user, please select any other login option from the previous page.
          </div>

          <button onClick={handleLogin} className="next-button" disabled={loading}>
            {loading ? <div className="loader"></div> : "Next"}
          </button>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>

          <p className="privacy-notice">
            Your email is never shared with external parties nor do we use it to spam you in any way.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
