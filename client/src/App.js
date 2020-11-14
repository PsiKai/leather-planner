import React, {useEffect} from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Today from './components/Today'
import Cover from "./components/Cover"
import './App.css';
import AppState from './context/AppState'
import AuthState from './context/AuthState'
import setAuthToken from "./utils/setAuthToken"
import PrivateRoute from "./components/routing/PrivateRoute"
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css/dist/js/materialize.min.js";



if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  })

  return (
    <AuthState>
      <AppState>
      <Router>
        <Switch>
          <PrivateRoute exact path="/today" component={Today} />
          <Route exact path="/" component={Cover} />  
        </Switch>
      </Router>
    </AppState> 
  </AuthState>
    
  );
}

export default App;
