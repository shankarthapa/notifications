import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    console.log("getting in componentWillMount");
  }
  componentDidUpdate() {
    console.log("getting in componentDidUpdate");
  }
  componentDidMount(){
    console.log("getting in componentDidMount");
  }
  render() {
    console.log('called here');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <button>click here</button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
