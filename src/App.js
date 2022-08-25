import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './lib';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>Learn More</Button>
      </header>
    </div>
  );
}

export default App;
