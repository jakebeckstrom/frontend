import { CircularProgress, Paper, Typography } from '@material-ui/core';
import React from 'react';
import '../styles/App.css';

export default function OldChat({message, name}) {

    return(
        <Paper>
            <Typography className={(name === message.player) ? "me" : "them"} variant="h6" display="inline">{message.player} : </Typography>
            <Typography display="inline">{message.question}</Typography>
            {message.answer ? <Typography display="inline"> &gt; {message.answer}</Typography> : <CircularProgress size="20px"/> }
        </Paper>
    )
}