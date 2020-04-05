import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './Header';
import GameBoard from './GameBoard';
import CurrentCard from './CurrentCard';



class App extends Component {
  render() {
    return (
      <>
        <AppHeader/>
        <GameBoard/>
        <CurrentCard/>
      </>
    )
  }
}

export default App;
