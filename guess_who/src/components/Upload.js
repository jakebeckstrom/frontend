import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { uploadSet } from '../utils/Api';

const SECRET = "lilbean2020";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Upload({open, sets, handleClickOpen, handleClickClose, setChange, change}) {

  const [name, setName] = React.useState("");
  const [key, setKey] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [namePass, setNamePass] = React.useState(true);
  const [keyPass, setKeyPass] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  //Listens for successful operation
  //Alerts -> updates app -> closes modal
  React.useEffect(() => {
    if (success) {
        alert("Images uploaded successfully");
        setChange(!change);
        handleClickClose();
    }
  }, [success, change, handleClickClose, setChange])

  //Sends upload to backend
  function handleSubmit() { uploadSet(name, images, setSuccess); }

  //Listeners for Name and key
  //Also validates input
  function listenName(event) {
    setNamePass(!(sets.includes(event.target.value)));
    setName(event.target.value);
  }

  function listenKey(event) {
    setKeyPass(event.target.value === SECRET);
    setKey(event.target.value);
  }

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
        <DialogTitle id="alert-dialog-slide-title">{"Upload a new character set"}</DialogTitle>
        <DialogContent>
          <TextField
            error={!namePass}
            // helperText="Name is already taken"
            variant="outlined"
            label="Name"
            onChange={listenName}
          />
          <TextField
            error={!keyPass}
            // helperText="Enter valid secret key"
            variant="outlined"
            label="Secret Key"
            onChange={listenKey}
            />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText="Drag and drop an image here or click"
            filesLimit={24}
            onChange={(files) => setImages(files)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            disabled={!(namePass && keyPass && (key !== ""))}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
