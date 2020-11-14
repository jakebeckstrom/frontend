import { Container, Typography } from '@material-ui/core';
import React from 'react';
import './styles/App.css';
import ChatSend from './components/ChatSend';
import ChatRecieve from './components/ChatReceive';

export default function Chat({name, opponent, isPlayerOne}) {

    const [turn, updateTurn] = React.useState(isPlayerOne);

    return(
        <Container className="chatbox">
            <Typography>
                Chat
            </Typography>
            <ChatSend/>
            <ChatRecieve/>
        </Container>
    )

}