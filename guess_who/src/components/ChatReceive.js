import React from 'react';
import { Container, Typography, Button, Paper, CircularProgress } from '@material-ui/core';

export default function ChatReceive() {

    const [question, updateQuestion] = React.useState("");

    return(
        <Container className="chatitem">
            <Typography variant="h6">Their Question</Typography>
            <Paper>
                {question ? <p>{question}</p> : <CircularProgress size="20px" /> }
            </Paper>
            <Button
                variant="contained">
                Yes
            </Button>
            <Button
                variant="contained">
                No
            </Button>
        </Container>
    )
}