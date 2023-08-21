
import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    let isValid = true;

    // Validation
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: username,
              phone: phone,
            }).then(() => {
              history.push('/login');
            });
          });
        })
        .catch((error) => {
          // Handle Firebase-specific errors
          if (error.code === 'auth/invalid-email') {
            setEmailError(error.message);
          } else if (error.code === 'auth/email-already-in-use') {
            setEmailError('Email address is already in use');
          } else {
            // Handle other errors here
            console.error('Signup Error:', error);
          }
        });
    } else {
      // Add 'has-error' class to increase height
      document.querySelector('.signupParentDiv').classList.add('has-error');
    }
  };

  return (
    <div>
      <div
        className={`signupParentDiv ${
          usernameError || emailError || phoneError || passwordError ? 'has-error' : ''
        }`}
      >
        <img width="200px" height="200px" src="../../../Images/olx-logo.png" alt="OLX Logo" />
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          {usernameError && <span className="error">{usernameError}</span>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          {phoneError && <span className="error">{phoneError}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <br />
          <button>Signup</button>
        </form>
  
        <a onClick={() => history.push('/login')}>Login</a>

      
      </div>
    </div>
  );
}
