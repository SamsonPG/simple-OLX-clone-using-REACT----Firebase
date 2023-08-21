
import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import './Login.css';
import { useHistory } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');


  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError('');
    setPasswordError('');
    setFirebaseError('');

    let isValid = true;

    // Validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          setFirebaseError(error.message);
        });
    } else {
      // Add 'has-error' class to increase height
      document.querySelector('.loginParentDiv').classList.add('has-error');
    }
  };


  return (
    <div>

        <div className={`loginParentDiv ${emailError || passwordError || firebaseError ? 'has-error' : ''}`}>
          <img width="200px" height="200px" src="../../../Images/olx-logo.png" alt="OLX Logo" />
          <form onSubmit={handleLogin}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              id="fname"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            {emailError && <span className="error">{emailError}</span>}
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              id="lname"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            {passwordError && <span className="error">{passwordError}</span>}
            <br />
            <br />
            <button>Login</button>
          </form>
          {firebaseError && <div className="error">{firebaseError}</div>}
          
          <a onClick={() => history.push('/signup')}>Signup</a>
        </div>

    </div>
  );
}

export default Login;
