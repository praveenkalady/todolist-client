import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DisplayTodos from './components/DisplayTodos';
function App() {
  return (
    <Router>
    <div className="App">
     <Header/>
     <div className="container">
        <Switch>
            <Route exact path="/" component={DisplayTodos} />
        </Switch>
     </div>
     </div>
     </Router>
  );
}

export default App;
