import { Typography } from '@material-ui/core';
import React from 'react';
import Card from './components/Card';

export default function CurrentCard({char}) {

  
    return (
      <div>
        <Typography variant="h4">Your Character</Typography>
        <Card
        char={char}
        disabled={true}
        />
      </div>
    )
  }