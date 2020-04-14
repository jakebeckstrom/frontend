import React, { Component } from 'react';
import { Segment, Label } from 'semantic-ui-react';

export default class GameCard {
  constructor(props) {
    super(props);
  }

  setID(){
    return this.id++;
  }

  handleClick = event => {
    console.log("Clicked");
    console.log(event.currentTarget.id);
    let i = event.currentTarget.id;
    this.toggled[i] = !this.toggled[i];
    console.log(this.state.chars);
    if (this.toggled[i]) {
      event.currentTarget.src = LOCAL + '/black.png';
    } else {
      let j = 0;
      while (i - 8 >= 0) {
        j++;
        i = i -8;
      }

      event.currentTarget.src = LOCAL + '/' + this.state.chars[j][i];
    }
  }


  render() {


    return (
      <Segment>
          <Image
              id={this.setID()}
              onClick={this.handleClick}
              width="150px"
              src={this.props.imageURL}
               />
          <Label attached='bottem'>{this.props.imageText}</Label>
      </Segment>
    )
  }
}
