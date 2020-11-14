import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const AWSHOST = 'https://guess-who-static-files.s3.amazonaws.com/';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tile: {
      padding: theme.spacing(2),
      height: 'auto',
      width: 180,
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

export default function Card({char, disabled}) {
  const classes = useStyles();

  const [covered, setCovered] = React.useState(false);

  function formatText(name) {
    return name.substring(name.indexOf('/')+1).slice(0, -4);
  }

  function toggle(event) {
    console.log(event.currentTarget.id);
    setCovered(!covered);
  }
  
    return (
      <Grid item className={classes.tile}>
        <ButtonBase className={classes.image} id={formatText(char)} onClick={toggle} disabled={disabled}>
          {covered ? <img className={classes.img} alt="complex" src="/black.png"/> :
          <img className={classes.img} alt="complex" src={AWSHOST + char}/>}
        </ButtonBase>
        <Paper className={classes.paper}>{formatText(char)}</Paper>
      </Grid>
    )
  }