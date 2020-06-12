import React, { Component } from 'react';
import { Segment, Label, Image } from 'semantic-ui-react';

// const API = 'https://guess-who-server12.herokuapp.com';
const API = 'http://localhost:3000'
const AWSHOST = 'http://guess-who-static-files.s3.amazonaws.com/';


export default class CurrentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: "",
      processed: false
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.set !== prevProps.set) {
      this.setState({
        chars: "",
        processed: false,
      });
      this.getChar();
    }
  }


  async getChar() {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: this.props.set })
    };
    await fetch(API + '/getChar', req)
      .then(res => res.text())
        .then(res => this.setState({ char: JSON.parse(res).char }))
        .catch(err => console.log(err));

    this.setState({
      processed: true
    })
  }

  componentDidMount() {
    this.getChar();
  }

  getImageURL = name => {
    return AWSHOST + name;
  }

  formatText = name => {
    return name.substring(name.indexOf('/')+1).slice(0, -4);
  }

  render() {



    return (
      <>
      <Segment>
        <Label attached='top'>Your Character</Label>
        {this.state.processed && (
          <>
          <Segment>
              <Image
                  onClick={this.handleClick}
                  width="150px"
                  src={this.getImageURL(this.state.char)}
                   />
              <Label attached='bottom'>{this.formatText(this.state.char)}</Label>
          </Segment>
          </>
        )} {!this.state.processed && (
          <p>Loading</p>
        )}
      </Segment>
      </>
    )

  }
}
