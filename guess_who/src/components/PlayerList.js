import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PlayerList({playerList, playerName, handleOpponentClick, handleClickClose}) {
  const classes = useStyles();

  const handleItemClick = (event) => {
      handleOpponentClick(event.currentTarget.id);
      handleClickClose();
  }
  
  function PlayerItem({name}) {
    return (
        <ListItem 
          id={name}
          button
          disabled={playerName === ""}
          onClick={handleItemClick}
          >
          <ListItemText 
            id={name}
            primary={name} 
          />
        </ListItem>
    )
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {playerList.map((name) => <PlayerItem name={name} />)}
      </List>
    </div>
  );
}
