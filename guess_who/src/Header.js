import React, { Component } from 'react';
import { Header, Grid, Button, Segment } from 'semantic-ui-react';

const API = 'http://skiumah4.mynetgear.com:3006';
const REFRESH_EVERY_MS = 1000;

export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      submittedName: "",
      opponentName: ""
    }

    this.choose = this.choose.bind(this);

    this.refreshInterval = setInterval(
      this.getOpponent,
      REFRESH_EVERY_MS
    );

    this.getOpponent();
  }

  stopAutomaticRefreshing() {
    clearInterval(this.refreshInterval);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  getOpponent = async e => {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ myName: this.state.submittedName })
    };
    await fetch(API + '/name/getOpponent', req)
      .then(res => res.text())
        .then(res => {
          if (JSON.parse(res).retNames) {
            this.stopAutomaticRefreshing();
            this.setState({
              opponentName: JSON.parse(res).retNames[0]
            })
          }
        });

  }

  handleSubmit = () => {
    const { name } = this.state

    this.setState({ submittedName: name })
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    };
    fetch(API + '/name/setName', req)
      .then(res => res.json())
        .then(data => console.log(data));
  }

  choose = event => {
    console.log(event.currentTarget.id);
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
    console.log('reset');
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
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Start Over</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
