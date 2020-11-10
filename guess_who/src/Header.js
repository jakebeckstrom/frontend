import React from 'react';
import { Button, Typography, Container, Menu, MenuItem, IconButton } from '@material-ui/core';
import Upload from './components/Upload';
import Remove from './components/Remove';
import JoinGame from './components/JoinGame';
import { fetchSets, postSet } from './utils/Api';


export default function AppHeader({updateGameId, updateName, gameId,
  updateOpponent, updateIsPlayerOne, updateSet, name, opponent, set, reset}) {

    const [sets, updateSets] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const [joinOpen, setJoinOpen] = React.useState(false);
    const [removeOpen, setRemoveOpen] = React.useState(false);
    const [change, setChange] = React.useState(false);

    //Modal Open and close toggles
    const handleUploadOpen = () => { setUploadOpen(true); };
    const handleUploadClose = () => { setUploadOpen(false); };
    const handleJoinOpen = () => { setJoinOpen(true); };
    const handleJoinClose = () => { setJoinOpen(false); };
    const handleRemoveOpen = () => { setRemoveOpen(true); };
    const handleRemoveClose = () => { setRemoveOpen(false); };

    //Listens for changes to set as result of remove or upload set
    React.useEffect(() => {
      fetchSets(updateSets);
    }, [change])

    //toggles fror opening and closing menu
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    //Handles selection of a set from menu
    const choose = (event) => {
      postSet(gameId, event.currentTarget.id, updateSet)
      handleClose();
    }

    return (
      <Container className="header">
          <Upload 
            open={uploadOpen} 
            sets={sets} 
            handleClickOpen={handleUploadOpen} 
            handleClickClose={handleUploadClose} 
            setChange={setChange} 
            change={change} />
          <Remove 
            open={removeOpen}  
            sets={sets} 
            handlClickOpen={handleRemoveOpen} 
            handleClickClose={handleRemoveClose} 
            setChange={setChange} 
            change={change}/>
          <JoinGame 
            open={joinOpen} 
            handleClickOpen={handleJoinOpen} 
            handleClickClose={handleJoinClose} 
            updateGameId={updateGameId}
            updateName={updateName}
            updateOpponent={updateOpponent}
            updateIsPlayerOne={updateIsPlayerOne}/>
            <Typography variant='h3' className="title">
              Guess Who
            </Typography>
            <Button 
              className="button" 
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={handleClick}>
              {set === "" ? 'Select Character Set' : set}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {sets.map((setName) => 
                <MenuItem 
                  id={setName} 
                  onClick={choose}>
                    {setName}
                  </MenuItem>)}
            </Menu>
            <Button 
              onClick={reset}
              className="button">
                Reset
              </Button>
            <Button 
              onClick={handleUploadOpen} 
              className="button">
                Add Set
              </Button>
            <Button 
              onClick={handleRemoveOpen} 
              className="button">
                Remove Set
              </Button>
            <div className="joingame">
              { name === "" ? 
              <Button 
                onClick={handleJoinOpen}>
                <Typography variant="h5">
                  Join Game
                </Typography>
              </Button> : 
             <>
                <Typography variant="h6">
                  {`${name} vs ${(opponent === "") ? "Waiting on opponent" : opponent}`}
                </Typography>
                <IconButton />
              </>
                }
            </div>
      </Container>
    )
  }
