import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";

class App extends Component {
  render() {
    return <Game />;
  }
}

export default App;
