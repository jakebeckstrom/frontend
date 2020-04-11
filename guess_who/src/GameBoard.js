import React, { Component } from 'react';
import { Grid, Segment, Button, Card, Label, List, Image, Dimmer } from 'semantic-ui-react';

const LOCAL = 'http://localhost:9000/images';

export default class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      apiResponse: "",
      chars: [],
      processed: false,
    };
    this.col = 6;
    this.row = 4;
    this.id = 0;
    this.toggled = [];
    let i = 0;
    for (i; i < 24; i++) {
      this.toggled.push(false);
    }
    this.handleClick = this.handleClick.bind(this);
  }


  async callAPI() {
    await fetch("http://localhost:9000/getImages")
      .then(res => res.text())
        .then(res => this.setState({ apiResponse: JSON.parse(res) }))
        .catch(err => console.log(err));

    console.log(this.state.apiResponse);
    let i = 0;
    let index = 0;
    for (i; i < 3; i++) {
      let temp = [];
      let per = 8;
      while (per > 0) {
        console.log(this.state.apiResponse.images[index]);
        temp.push(this.state.apiResponse.images[index]);
        index++;
        per--;
      }
      this.state.chars.push(temp);
    }
    console.log(this.state.chars);
    this.setState({
      processed: true
    })
  }


  componentDidMount() {
    this.callAPI();
  }

  formatText = name => {
    return name.slice(0, -4);
  }

  getImageURL = name => {
    return LOCAL + '/' + name;
  }

  handleClick = event => {
    console.log("Clicked");
    console.log(event.currentTarget.id);
    let i = event.currentTarget.id;
    this.toggled[i] = !this.toggled[i];
    console.log(this.state.chars);
    if (this.toggled[i]) {
      event.currentTarget.src = LOCAL + '/' + 'black.png';
    } else {
      let j = 0;
      while (i - 8 >= 0) {
        j++;
        i = i -8;
      }

      event.currentTarget.src = LOCAL + '/' + this.state.chars[j][i];
    }
  }

  setID(){
    return this.id++;
  }

  render() {


    const gameTileCol = image => (

      <Grid.Column width={2}>
        <Card>
          <Card.Content>
            <Image
                id={this.setID()}
                onClick={this.handleClick}
                width="150px"
                src={this.getImageURL(image)}
                 />
            <Card.Header>{this.formatText(image)}</Card.Header>
          </Card.Content>
        </Card>
      </Grid.Column>
    );

    const gameTile = images => (
      <Grid.Row columns={8}>
        {images.map(image => gameTileCol(image))}
       </Grid.Row>
    );

    return (
      <>
        {this.state.processed && (
          <Grid centered>
            {this.state.chars.map(image => gameTile(image))}
          </Grid>
        )} {!this.state.processed && (
          <p>Loading</p>
        )}
      </>
    )
  }
}
