import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './Header';
import GameBoard from './GameBoard';
import CurrentCard from './CurrentCard';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: []
    }

  }

  render() {
    return (
      <>
        <AppHeader/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <GameBoard/>
            </Grid.Column>
            <Grid.Column width={2}>
              <CurrentCard/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default App;
