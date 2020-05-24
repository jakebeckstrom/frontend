import React, { Component } from 'react';
import { Header, Grid, Button, Segment } from 'semantic-ui-react';

const API = 'https://guess-who-server12.herokuapp.com';

export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      submittedName: "",
      opponentName: ""
    }

    this.choose = this.choose.bind(this);
  }

  choose = event => {
    let choice = event.currentTarget.id;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: choice })
    };
    fetch(API + '/getImages/setChoice', req)
      .then(res => res.json())
        .then(data => console.log(data));
  }

  handleReset = async e => {
    await fetch(API + '/getImages/reset')
      .then(res => res.text())
        .then(res => console.log(JSON.parse(res).message))
          .catch(err => console.log(err));
    }

  render() {

    return (
      <>
        <Grid>
          <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h1' textAlign='center'>Guess Who</Header>
            </Segment>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <Button id='Office' onClick={this.choose}>The Office</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button id='WalkingDead' onClick={this.choose}>The Walking Dead</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button id='Brooklyn' onClick={this.choose}>Brooklyn 99</Button>
            </Grid.Column>
            <Grid.Column>
              <Button id='HarryPotter' onClick={this.choose}>Harry Potter</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Start Over</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
