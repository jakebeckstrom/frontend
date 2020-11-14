import { Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function OldChat({message}) {
    return(
        <Paper>
            <Typography float="left">{message.player + " " + message.question + " " + message.answer}</Typography>
        </Paper>
    )
}