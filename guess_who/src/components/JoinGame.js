import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Container, TextField, Typography } from '@material-ui/core';
import PlayerList from './PlayerList';
import { startGame, getNames, joinGame } from '../utils/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinGame({open, handleClickClose, updateGameId, updateIsPlayerOne}) {
  
  const [name, setName] = React.useState("");
  const [playerList, setPlayerList] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  
  //Listen for change in name
  function listenName(event) { setName(event.target.value); }

  //start new game on backend
  function handleStartGame() {
    updateIsPlayerOne(true);
    startGame(name, updateGameId);
    handleClickClose();
  }

  function handleOpponentClick(opponent) {
    joinGame(opponent, name, updateGameId, setSuccess);
  }

  //Fetch player list on each open
  React.useEffect(() => {
    getNames(setPlayerList);
  }, [open])

  //Close on successful join game
  React.useEffect(() => {
    if (success) {
      handleClickClose();
    }
  }, [success, handleClickClose]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Start a Game or Join a New one"}</DialogTitle>
        <Container>
        <TextField
            error={false}
            variant="outlined"
            label="Name"
            onChange={listenName}
            />
        <Button
          disabled={name === ""}   
          onClick={handleStartGame}     
          >
            Start New Game
          </Button>
        <Typography>Or join a game</Typography>
        {playerList !== [] ?
        <PlayerList
            playerList={playerList}
            playerName={name}
            handleOpponentClick={handleOpponentClick}
            handleClickClose={handleClickClose}
         /> : null}
        </Container>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
