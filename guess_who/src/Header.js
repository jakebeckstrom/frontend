import React, { Component } from 'react';
import { Header, Grid, Button, Segment, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';

// const API = 'https://guess-who-server12.herokuapp.com';
const API = 'http://localhost:3000'

export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      message: '',
      sets: [],
      processed: false,
      selected: false
    }
    this.getAvailableSets();
    this.choose = this.choose.bind(this);
  }

  choose = (event, data) => {
    let choice = data.value;
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: choice })
    };
    fetch(API + '/getImages/setChoice', req)
      .then(res => res.json())
        .then(data => console.log(data));
    this.setState({
      selected: true
    })
  }

  getAvailableSets = async () => {
    await fetch(API + '/getImages/getSets')
      .then(res => res.text())
        .then(res => this.setState(state => {
          const sets = state.sets.concat(JSON.parse(res).sets);

          return {
            sets,
            processed: true
          }
        }))
          .catch(err => console.log(err));
  }


  handleReset = async e => {
    await fetch(API + '/getImages/reset')
      .then(res => res.text())
        .then(res => console.log(JSON.parse(res).message))
          .catch(err => console.log(err));
    // let menu = document.getElementById('selector').getElementsByClassName('text')[0];
    // console.log(menu);
    // menu.innerHTML = 'Select Character Set';
    // document.getElementById('selector').reset();
    this.setState({
      selected: false
    })
    }

  addImageSet = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    this.setState({
      images
    })
  }

  setName = (event, data) => {
    let message = data.value;
    this.setState({
      message
    })
  }

  uploadImages = async e => {

    const data = new FormData();

    // data.append("setName", this.state.message);
    this.state.images.map((image) => {
      data.append("image", image, image.name);
    });

    console.log(data.getAll('image'));
    data.append("setName", this.state.message);

    axios.post(API + '/getImages/uploadSet', data)
       .then(res => console.log(JSON.parse(res).Resp))
          .catch(err => console.log(err));
    this.getAvailableSets();
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
            <Grid.Column width={3}>
              <Dropdown
                id="selector" 
                placeholder='Select Character Set'
                fluid
                search
                selection
                options={this.state.sets}
                onChange={this.choose}
                />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Reset</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Input
                onChange={this.setName}
                />
              <Input 
                type='file' 
                onChange={this.addImageSet} 
                placeholder='Add Image Set'
                multiple
                />
              <Button onClick={this.uploadImages}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
