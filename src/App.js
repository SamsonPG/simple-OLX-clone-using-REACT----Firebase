
import React, { useEffect, useContext,useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import "./App.css";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";

import Home from "./Pages/Home";

function App() {
  const { user, setUser } = useContext(AuthContext); 
  const { firebase } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false); 
    });
  }, [firebase,setUser]);

  return (
    <div>
      <Post>
        <Router>
            {/* Render loading logo while isLoading is true */}
            {isLoading ? (
            <div className="loading">
              <img src="../../../Images/olx-logo.png" alt="Loading" className="loading-logo" />
            </div>
          ) : (
            // Render routes when loading is false
            <>
          <Switch>
            {/* Redirect to "/" if user is logged in */}
            {user ? <Redirect exact from="/login" to="/" /> : <Route path="/login"><Login /></Route>}
            {user ? <Redirect exact from="/signup" to="/" /> : <Route path="/signup"><Signup /></Route>}
            {user ? <Route  exact path="/create"><Create /></Route> : <Redirect exact from="/create" to="/" /> }
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/view">
              <View />
            </Route>
          </Switch>
          </>
          )}
        </Router>
      </Post>
    </div>
  );
}

export default App;
