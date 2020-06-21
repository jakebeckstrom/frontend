import React, { Component } from 'react';
import './App.css';
import AppHeader from './Header';
import GameBoard from './GameBoard';
import CurrentCard from './CurrentCard';
import { Grid, Segment, Loader } from 'semantic-ui-react';

// const API = 'https://guess-who-server12.herokuapp.com';
// const API = 'http://localhost:3000'

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
    await fetch(process.env.REACT_APP_API + '/getImages/getChoice')
      .then(res => res.text())
        .then(res => {
          if (JSON.parse(res).setChosen !== this.state.setChosen) {
            this.setState({ setChosen: JSON.parse(res).setChosen })
          }
          })
        .catch(err => console.log(err));
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
        <Segment>
           <Loader active inline='centered'>Choose Your Character Set</Loader>
        </Segment>
      )}
      </>
    )
  }
}

export default App;
