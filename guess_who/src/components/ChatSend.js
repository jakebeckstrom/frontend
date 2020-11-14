import { Button, Container, TextField, Typography } from '@material-ui/core';
import React from 'react';

export default function ChatSend() {
    
    return(
        <Container className="chatitem">
            <Typography variant="h6">Your turn</Typography>
            <TextField 
                variant="outlined"
                size="small"
                label="Question"
                />
            <Button
                variant="contained">
                Send
            </Button>
        </Container>
    )
}
