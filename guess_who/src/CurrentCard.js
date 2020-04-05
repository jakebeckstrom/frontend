import React, { Component } from 'react';
import { Segment, Label } from 'semantic-ui-react';

export default class CurrentCard extends Component {

  render() {

    return (
      <>
      <Segment>
        <Label attached='top'>Your Character</Label>
      </Segment>
      </>
    )

  }
}
