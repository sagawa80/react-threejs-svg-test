import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import WebglBG from './WebglBG';

function App() {
  const [currentState, setState] = useState("none");
  const fromHomeNotice = () => {
    setState("home");
    //console.log("Home End");
  };
  const fromAboutNotice = () => {
    setState("about");
    //console.log("About End");
  };
  return (
    <div className="App">
      <BrowserRouter>
        <header className="header">
          <h1>REACT TEST</h1>
          <Navbar />
        </header>
        <div className="content-main">
          <Switch>
            <Route exact path='/'>
              <Home currentState={currentState} />
            </Route>
            <Route exact path='/About'>
              <About currentState={currentState} />
            </Route>
          </Switch>
        </div>
        <div className="webgl-bg">
          <WebglBG fromHomeNotice={fromHomeNotice} fromAboutNotice={fromAboutNotice}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
