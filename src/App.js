import React, { Component } from 'react';
import './App.css';
import BodyContent from './body-content/body-content';
import HeaderContent from './header-content/header-content';

class App extends Component {
  componentWillMount() {
    console.log("getting in componentWillMount");
  }
  componentDidUpdate() {
    console.log("getting in componentDidUpdate");
  }
  componentDidMount() {
    console.log("getting in componentDidMount");
  }
  render() {
    console.log('called here');
    return (
      <div className="App">
        <HeaderContent />
        <BodyContent />
      </div>
    );
  }
}

export default App;
