import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Today from './components/day/Today'
import Cover from "./components/cover/Cover"
import EditProfile from "./components/profile/EditProfile";
import AppState from './context/application/AppState'
import AuthState from './context/authentication/AuthState'
import setAuthToken from "./utils/setAuthToken"
import PrivateRoute from "./components/routing/PrivateRoute"
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  return (
    <AuthState>
      <AppState>
        <Router>
          <Switch>
            <PrivateRoute exact path="/today" component={Today} />
            <Route exact path="/" component={Cover} />
            <PrivateRoute exact path="/profile" component={EditProfile} />
          </Switch>
        </Router>
      </AppState>
    </AuthState>

  );
}

export default App;
