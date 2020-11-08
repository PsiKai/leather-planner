import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Today from './components/Today'
import Cover from "./components/Cover"
import './App.css';
import AppState from './context/AppState'

function App() {
  return (
    <AppState>
      <Router>
        <Switch>
          <Route exact path="/" component={Cover} />
          <Route exact path="/today" component={Today} />
        </Switch>
      </Router>
    </AppState> 
  );
}

export default App;
