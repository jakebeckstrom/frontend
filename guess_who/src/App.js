import React from "react";
import "./styles/App.css";
import AppHeader from "./Header";
import GameBoard from "./GameBoard";
import CurrentCard from "./CurrentCard";
import { fetchImages, getGameStatus, resetGame, test } from "./utils/Api";
import Chat from "./Chat";

let pollTimer = null;

function App() {
  const [charList, updateCharList] = React.useState([]);
  const [set, updateSet] = React.useState("");
  const [gameId, updateGameId] = React.useState(-1);
  const [name, updateName] = React.useState("");
  const [opponent, updateOpponent] = React.useState("");
  const [char, updateChar] = React.useState("");
  const [isPlayerOne, updateIsPlayerOne] = React.useState(false);

  //Resets current character, gameboard, removes setChosen from backend
  function reset() {
    resetGame(gameId);
    updateCharList([]);
    updateChar("");
  }

  React.useEffect(() => {
    test();
  });

  //Fetches list of images on change of set
  React.useEffect(() => {
    if (set === "") {
      updateChar("");
      updateCharList([]);
    }
    fetchImages(gameId, isPlayerOne, updateCharList, updateChar);
  }, [set, gameId, isPlayerOne]);

  //Updates status of the game on change to gameId
  //Then poll for opponent if neccessary
  React.useEffect(() => {
    console.log(gameId);
    if (gameId !== -1) {
      pollTimer = setInterval(() => {
        getGameStatus(
          gameId,
          isPlayerOne,
          updateName,
          updateOpponent,
          updateChar,
          updateSet
        );
      }, 1000);
    }
    return () => clearInterval(pollTimer);
  }, [gameId, isPlayerOne]);

  return (
    <>
      <AppHeader
        updateGameId={updateGameId}
        updateName={updateName}
        updateOpponent={updateOpponent}
        updateSet={updateSet}
        updateIsPlayerOne={updateIsPlayerOne}
        gameId={gameId}
        name={name}
        opponent={opponent}
        set={set}
        reset={reset}
      />
      <div className="board">
        {charList === [] ? <div /> : <GameBoard charList={charList} />}
      </div>
      <div className="current">
        {char === "" ? (
          <div />
        ) : (
          <div>
            <CurrentCard char={char} />
            <Chat
              name={name}
              opponent={opponent}
              isPlayerOne={isPlayerOne}
              set={set}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
