import React, { Component } from 'react';
import './App.css';
import AppHeader from './Header';
import GameBoard from './GameBoard';
import CurrentCard from './CurrentCard';
import { Grid } from 'semantic-ui-react';

const API = 'http://192.168.1.27:9000';
const DEVAPI = 'http://localhost:9000';
const REFRESH_EVERY_MS = 1000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      setChosen: ""
    }

    this.refreshInterval = setInterval(
      this.isChoiceMade,
      REFRESH_EVERY_MS
    );

    this.isChoiceMade();
  }

  isChoiceMade = async e => {
    await fetch(API + '/getImages/getChoice')
      .then(res => res.text())
        .then(res => {
          if (JSON.parse(res).setChosen !== this.state.setChosen) {
            this.setState({ setChosen: JSON.parse(res).setChosen })
          }
          })
        .catch(err => console.log(err));
        // console.log(this.state.setChosen);
  }

  render() {
    return (
      <>
        <AppHeader/>
        {this.state.setChosen && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <GameBoard
                set={this.state.setChosen}/>
            </Grid.Column>
            <Grid.Column width={2}>
              <CurrentCard
                set={this.state.setChosen}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}  { !this.state.setChosen && (
        <h1>Choose your character set</h1>
      )}
      </>
    )
  }
}

export default App;
