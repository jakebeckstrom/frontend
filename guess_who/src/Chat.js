import { Container, List, Typography } from '@material-ui/core';
import React from 'react';
import './styles/App.css';
import ChatSend from './components/ChatSend';
import ChatRecieve from './components/ChatReceive';
import OldChat from './components/OldChat'

export default function Chat({name, opponent, set, isPlayerOne}) {

    const [turn, updateTurn] = React.useState(isPlayerOne);
    const [question, updateQuestion] = React.useState("");
    const [chats, updateChats] = React.useState([]);
    const [cur, updateCur] = React.useState("");
    const [ws, setWs] = React.useState(new WebSocket('ws://localhost:8080'));

    //Clear state for next question
    const newTurn = () => {
        updateQuestion("");
        updateTurn(!turn);
    }

    //Send a new question to opponent
    const askQuestion = () => {
        const message = {type: "Q", user: name, question: question}
        ws.send(JSON.stringify(message));
        updateCur(question); //save current question/wait for answer
    }

    //Answer functions
    const answerYes = () => {
        const message = {type: "A", user: name, answer: "Yes"};
        updateChats([{player: opponent, question: question, answer: "Yes"}, ...chats]);
        ws.send(JSON.stringify(message));
        newTurn();
    }

    const answerNo = () => {
        const message = {type: "A", user: name, answer: "No"};
        updateChats([{player: opponent, question: question, answer: "No"}, ...chats]);
        ws.send(JSON.stringify(message));
        newTurn();
    }

    // listen for two different types of messages
    React.useEffect(() => {
        // signal connection
        ws.onopen = () => {
            console.log("Websocket connected");
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.type === "Q") {
                updateQuestion(message.question);
            } else {
                updateChats([{player: name, question: cur, answer: message.answer}, ...chats]);
                updateCur("");
                updateQuestion("");
                updateTurn(!turn);
            }
        }

        return () =>
        ws.onclose = () => {
            console.log("websocket disconnected");
            setWs(new WebSocket('ws://localhost:8080'));
        }
    }, [ws.onmessage, ws.onopen, ws.onclose, chats, cur, name, turn])

    React.useEffect(() => {
        updateChats([]);
    }, [set])

    return(
        <Container className="chatbox">
            <Typography>
                Chat
            </Typography>
            <List>
                {chats.map((i) => <OldChat message={i} name={name}/>)}
            </List>
            {cur ? <OldChat message={{player: name, question: cur, answer: ""}} name={name}/> : null}
            {turn ? 
            <ChatSend onQuestionChange={updateQuestion} onSendClick={askQuestion} question={question}/> :
            <ChatRecieve question={question} answerYes={answerYes} answerNo={answerNo}/> }
        </Container>
    )

}