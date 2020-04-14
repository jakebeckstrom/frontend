import React, { Component } from 'react';
import { Header, Grid, Form, Button } from 'semantic-ui-react';

const API = 'http://' + window.location.hostname + ':9000';

export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      submittedName: ""
    }

    this.choose = this.choose.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name } = this.state

    this.setState({ submittedName: name })
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

    const { name } = this.state

    return (
      <>
        <Grid>
          <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h1' textAlign='center'>Guess Who</Header>
          </Grid.Column>
          <Grid.Column>
            {this.state.submittedName && (
              <Header as='h2' textAlign='left'>{this.state.name}</Header>
            )}
          {!this.state.submittedName && (
            <Form  onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Form.Input
                  placeholder="Name"
                  name='name'
                  value={name}
                  onChange={this.handleChange}
                />
                <Form.Button>Start</Form.Button>
              </Form.Group>
            </Form>
          )}
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
