import React, { Component } from 'react';
import { Header, Grid, Button, Segment, Dropdown, Input } from 'semantic-ui-react';
import Upload from './Upload';


export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      sets: [],
      processed: false,
      selected: false,
      name: '',
      opponent: ''
    }
    console.log(process.env.REACT_APP_API);
    this.handleReset();
    this.choose = this.choose.bind(this);
  }

  choose = (event, data) => {
    let choice = data.value;
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: choice })
    };
    fetch(process.env.REACT_APP_API + '/getImages/setChoice', req)
      .then(res => res.json())
        .then(data => console.log(data));
    this.setState({
      selected: true
    });
    data.value = null;
  }

  getAvailableSets = () => {
    fetch(process.env.REACT_APP_API + '/getImages/getSets')
      .then(res => res.json())
        .then(data => {
          data.sets.forEach(element => {
            this.state.sets.push(element);
          });
        })
          .catch(err => console.log(err));
    this.setState({
      processed: true
    })
  }



  handleReset = async e => {
    await fetch(process.env.REACT_APP_API + '/getImages/reset')
      .then(res => res.text())
        .then(res => console.log(JSON.parse(res).message))
          .catch(err => console.log(err));
      this.setState({
        sets: [],
        selected: false,
        processed: false
      }, this.getAvailableSets);
    }
  
    setName = (event, data) => {
      this.setState({
        name: data.value
      });
    }

    sendName = () => {
      console.log(this.state.name);
    }

  render() {

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}/>
          <Grid.Column width={10}>
            <Segment raised padded>
              <Header as='h1' textAlign='center' color='blue'>Guess Who</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column width={2}>
            <Input
              label='Name'
              onChange={this.setName} />
            <Button
              onClick={this.sendName} >Play</Button>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              {this.state.processed && (
              <Dropdown
                id="selector" 
                placeholder='Select Character Set'
                fluid
                search
                selection
                options={this.state.sets}
                onChange={this.choose}
                />)}
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Reset</Button>
            </Grid.Column>
            <Grid.Column width={8}>
                <Upload 
                  sets={this.state.sets}
                  handleReset={this.handleReset}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
