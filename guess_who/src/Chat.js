import { Container, List, Typography } from '@material-ui/core';
import React from 'react';
import './styles/App.css';
import ChatSend from './components/ChatSend';
import ChatRecieve from './components/ChatReceive';
import OldChat from './components/OldChat'

const messages = [
    {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }, {
        player: "bean",
        question: "Is it red?",
        answer: "Yes"
    }

]

export default function Chat({name, opponent, isPlayerOne}) {

    const [turn, updateTurn] = React.useState(isPlayerOne);
    const [question, updateQuestion] = React.useState("");

    return(
        <Container className="chatbox">
            <Typography>
                Chat
            </Typography>
            <List>
                {messages.map((i) => <OldChat message={i} />)}
            </List>
            {/* <OldChat message={message}/> */}
            <ChatSend/>
            <ChatRecieve/>
        </Container>
    )

}