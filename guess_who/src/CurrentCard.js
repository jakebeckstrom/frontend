import React, { Component } from 'react';
import { Segment, Label, Image } from 'semantic-ui-react';

const LOCAL = 'http://localhost:9000/images';

export default class CurrentCard extends Component {
  constructor() {
    super();
    this.state = {
      char: "",
      processed: false
    }
  }

  async callAPI() {
    await fetch("http://localhost:9000/getChar")
      .then(res => res.text())
        .then(res => this.setState({ char: JSON.parse(res).char }))
        .catch(err => console.log(err));

    console.log(this.state.char);
    this.setState({
      processed: true
    })
  }

  componentDidMount() {
    this.callAPI();
  }

  getImageURL = name => {
    console.log(name);
    return LOCAL + '/' + name;
  }

  formatText = name => {
    return name.slice(0, -4);
  }

  render() {



    return (
      <>
      <Segment>
        <Label attached='top'>Your Character</Label>
        {this.state.processed && (
          <>
          <Image src={this.getImageURL(this.state.char)} width='150px'/>
          <p>{this.formatText(this.state.char)}</p>
          </>
        )} {!this.state.processed && (
          <p>Loading</p>
        )}
      </Segment>
      </>
    )

  }
}
