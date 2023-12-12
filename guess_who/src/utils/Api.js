import axios from "axios";

//Gets image list
// USES: App.js
//Expected callbacks -- updateCharList, updateChar
export async function fetchImages(gameId, isPlayerOne, updateList, updateChar) {
  const req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId: gameId }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/game", req);
  const json = await res.json();
  console.log(json);
  if (json.error !== "no set chosen") {
    if (isPlayerOne) {
      updateChar(json.one);
    } else {
      updateChar(json.two);
    }
    updateList(json.images);
  }
}

//Gets list of available setsprocess.env.REACT_APP_API
//USES: Header.js
//Expected callback -- updateSets
export async function fetchSets(update) {
  const res = await fetch(process.env.REACT_APP_API + "/game/getSets");
  const json = await res.json();
  update(json.sets);
}

//Sends selected set to backend
//USES: App.js, Header.js
//Expected callback -- updateSet
export async function postSet(gameId, set, update) {
  const req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameId: gameId,
      set: set,
    }),
  };
  fetch(process.env.REACT_APP_API + "/game/setChoice", req);
  update(set);
}

//uploads New set to static storage
//USES: Upload.js
//expected callback -- setSuccess
export async function uploadSet(name, images, update) {
  const data = new FormData();
  images.forEach((image) => {
    data.append("image", image, image.name);
  });
  data.append("setName", name);
  const res = await axios.post(process.env.REACT_APP_API + "/upload", data);
  const json = await res.data;
  update(json.resp === "success");
}

//Removes set from static storage
//USES: Remove.js
//Expected callback -- setSuccess
export async function removeSet(name, update) {
  var req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rname: name }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/upload/removeSet", req);
  const json = await res.json();
  update(json.resp === "success");
}

//Starts game
//USES JoinGame.js
//Expected callback -- updateGameId
export async function startGame(name, update) {
  var req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/game/startGame", req);
  const json = await res.json();
  update(json.gameId);
}

//Gets other players
//USES: JoinGame.js
//Expected callback -- setPlayerList
export async function getNames(update) {
  const res = await fetch(process.env.REACT_APP_API + "/game/getNames");
  const json = await res.json();
  update(json.players);
}

export async function joinGame(opponent, name, updateGameId, updateSuccess) {
  var req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      opponent: opponent,
      name: name,
    }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/game/joinGame", req);
  const json = await res.json();
  updateGameId(json.gameId);
  updateSuccess(json.res === "success");
}

//Returns game object from backend
//USES: App.js
//Expected callbacks -- updateName, updateOpponent
export async function getGameStatus(
  gameId,
  isPlayerOne,
  updateName,
  updateOpponent,
  updateChar,
  updateSet
) {
  var req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId: gameId }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/game/gameStatus", req);
  const json = await res.json();
  console.log(json);
  updateSet(json.setChosen);
  if (isPlayerOne) {
    updateName(json.player1);
    updateOpponent(json.player2);
    updateChar(json.one);
  } else {
    updateName(json.player2);
    updateOpponent(json.player1);
    updateChar(json.two);
  }
}

export async function resetGame(gameId) {
  var req = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId: gameId }),
  };
  const res = await fetch(process.env.REACT_APP_API + "/game/reset", req);
  const json = await res.json();
  console.log(json);
}

export async function test() {
  var req = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(process.env.REACT_APP_API + "/testAPI", req);
  console.log(res.json());
}
