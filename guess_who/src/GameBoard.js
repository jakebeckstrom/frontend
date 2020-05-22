import React, { Component } from 'react';
import { Grid, Segment, Image, Label } from 'semantic-ui-react';

const API = 'http://192.168.1.27:9000';
const DEVAPI = 'http://localhost:9000';

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
      this.callAPI();
    }
  }

  async callAPI() {
    this.id = 0;
    console.log("Made API call");
    console.log(this.props.set);
    await fetch(DEVAPI + '/getImages/' + this.props.set)
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
        // console.log(this.state.apiResponse.images[index]);
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
    console.log("Component mounted");
    this.callAPI();
  }

  formatText = name => {
    return name.slice(0, -4);
  }

  getImageURL = name => {
    return DEVAPI + '/' + this.props.set + '/' + name;
  }

  handleClick = event => {
    console.log("Clicked");
    console.log(event.currentTarget.id);
    let i = event.currentTarget.id;
    this.toggled[i] = !this.toggled[i];
    if (this.toggled[i]) {
      event.currentTarget.src = DEVAPI + '/public/black.png';
    } else {
      console.log(i);
      let j = 0;
      while (i - 8 >= 0) {
        j++;
        i = i -8;
      }
      // console.log(j);
      event.currentTarget.src = DEVAPI + '/' + this.props.set + '/' + this.state.chars[j][i];
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
