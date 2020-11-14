import { Container, List, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import './styles/App.css';
import ChatSend from './components/ChatSend';
import ChatRecieve from './components/ChatReceive';
import OldChat from './components/OldChat'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        maxHeight: 300
    },
}));

export default function Chat({name, opponent, set, isPlayerOne}) {

    const classes = useStyles();

    const [turn, updateTurn] = React.useState(isPlayerOne);
    const [question, updateQuestion] = React.useState("");
    const [chats, updateChats] = React.useState([]);
    const [cur, updateCur] = React.useState("");
    const [status, updateStatus] = React.useState("Waiting");
    const [ws, setWs] = React.useState(new WebSocket(process.env.REACT_APP_WS));

    //Clear state for next question
    const newTurn = () => {
        updateQuestion("");
        updateTurn(!turn);
    }

    //Send a new question to opponent
    const askQuestion = () => {
        const message = {type: "Q", user: name, question: question}
        ws.send(JSON.stringify(message));
        updateCur(question); //save current question and wait for answer
    }

    //Answer functions
    const answerYes = () => {
        const message = {type: "A", user: name, answer: "Yes"};
        updateChats([...chats, {player: opponent, question: question, answer: "Yes"}]);
        ws.send(JSON.stringify(message));
        newTurn();
    }

    const answerNo = () => {
        const message = {type: "A", user: name, answer: "No"};
        updateChats([...chats, {player: opponent, question: question, answer: "No"}]);
        ws.send(JSON.stringify(message));
        newTurn();
    }

    // listen for two different types of messages
    React.useEffect(() => {
        // signal connection
        ws.onopen = () => { updateStatus("Ready"); }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.type === "Q") {
                updateQuestion(message.question);
            } else {
                updateChats([...chats, {player: name, question: cur, answer: message.answer}]);
                updateCur("");
                updateQuestion("");
                updateTurn(!turn);
            }
        }

        return () =>
            ws.onclose = () => {
                updateStatus("Disconnected");
                setWs(new WebSocket(process.env.REACT_APP_WS));
            }
    }, [ws.onmessage, ws.onopen, ws.onclose, chats, cur, name, turn])

    //Clear chat when switching games
    React.useEffect(() => {
        updateChats([]);
    }, [set])

    return(
        <Container className="chatbox">
            <Typography>
                {status}
            </Typography>
            <List className={classes.root}>
                {chats.map((i) => <OldChat message={i} name={name}/>)}
            </List>
            {cur ? <OldChat message={{player: name, question: cur, answer: ""}} name={name}/> : null}
            {turn ? 
                <ChatSend onQuestionChange={updateQuestion} onSendClick={askQuestion} question={question}/> :
                <ChatRecieve question={question} answerYes={answerYes} answerNo={answerNo}/> }
        </Container>
    )

}