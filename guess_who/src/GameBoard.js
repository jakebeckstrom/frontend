import React, { Component } from 'react';
import { Grid, Segment, Image, Label } from 'semantic-ui-react';

const API = 'https://guess-who-server12.herokuapp.com';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
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
  
  componentDidUpdate(prevProps) {
    if(this.props.set !== prevProps.set) {
      this.setState({
        apiResponse: "",
        chars: [],
        processed: false,
      });
      let i = 0;
      for (i; i < 24; i++) {
        this.toggled.push(false);
      }
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.id = 0;
    await fetch(API + '/getImages')
      .then(res => res.text())
        .then(res => this.setState({ apiResponse: JSON.parse(res) }))
        .catch(err => console.log(err));

    let i = 0;
    let index = 0;
    for (i; i < 3; i++) {
      let temp = [];
      let per = 8;
      while (per > 0) {
        temp.push(this.state.apiResponse.images[index]);
        index++;
        per--;
      }
      this.state.chars.push(temp);
    }
    this.setState({
      processed: true
    })
  }

  componentDidMount() {
    this.fetchImages();
  }

  formatText = name => {
    return name.slice(0, -4);
  }

  getImageURL = name => {
    return API + '/' + this.props.set + '/' + name;
  }

  handleClick = event => {
    let i = event.currentTarget.id;
    this.toggled[i] = !this.toggled[i];
    if (this.toggled[i]) {
      event.currentTarget.src = API + '/public/black.png';
    } else {
      let j = 0;
      while (i - 8 >= 0) {
        j++;
        i = i -8;
      }
      event.currentTarget.src = API + '/' + this.props.set + '/' + this.state.chars[j][i];
    }
  }

  setID() {
    return this.id++;
  }

  render() {


    const gameTileCol = image => (

      <Grid.Column width={2}>
        <Segment>
            <Image
                id={this.setID()}
                onClick={this.handleClick}
                src={this.getImageURL(image)}
                 />
            <Label attached='bottom'>{this.formatText(image)}</Label>
        </Segment>
      </Grid.Column>
    );

    const gameTile = images => (
      <Grid.Row stretched columns={8}>
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
