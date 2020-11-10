import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './components/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tile: {
    padding: theme.spacing(2),
    height: 'auto',
    width: '10%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function GameBoard({charList}) {
  const classes = useStyles();

  function GameTile({image}) {
    return(
      <Card
        char={image}
        disabled={false}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {charList.map((image) => <GameTile image={image}/>)}
      </Grid>
    </div>
  );
}
