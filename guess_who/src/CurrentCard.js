import React from 'react';
import Card from './components/Card';

export default function CurrentCard({char}) {

  
    return (
      <Card
      char={char}
      disabled={true}
      />
    )
  }