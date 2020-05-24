import React, { Component } from 'react';
import { Segment, Label, Image } from 'semantic-ui-react';

const API = 'https://guess-who-server12.herokuapp.com';


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
      this.callAPI();
    }
  }

  async callAPI() {
    await fetch(API + '/getChar/' + this.props.set)
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
    return API + '/' + this.props.set + '/' + name;
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
