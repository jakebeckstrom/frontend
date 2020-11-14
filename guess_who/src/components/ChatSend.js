import { Button, Container, TextField, Typography } from '@material-ui/core';
import React from 'react';

export default function ChatSend({onQuestionChange, onSendClick, question}) {
    
    return(
        <Container className="chatitem">
            <Typography variant="h6">Your turn</Typography>
            <TextField 
                variant="outlined"
                size="small"
                label="Question"
                onChange={e => onQuestionChange(e.currentTarget.value)}
                />
            <Button
                variant="contained"
                disabled={question === ""}
                onClick={onSendClick}>
                Send
            </Button>
        </Container>
    )
}
