import React, { Component } from 'react';
import { Header, Grid, Button, Segment, Dropdown, Input, Divider } from 'semantic-ui-react';
import Upload from './Upload';

const REFRESH_EVERY_MS = 2000;

export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      sets: [],
      opps: [],
      processed: false,
      selected: false,
      name: '',
      opponent: '',
      nameSet: false,
      oppSet: false,
      new: true,
      oppChosen: false,
      playerSet: false,
      gameId: 100
    }
    this.handleReset();
    this.choose = this.choose.bind(this);
    this.refreshInterval = setInterval(
      this.getOpponents,
      REFRESH_EVERY_MS
    );

    this.getOpponents();
  }

  choose = (event, data) => {
    let choice = data.value;
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: choice, id: this.state.gameId })
    };
    fetch(process.env.REACT_APP_API + '/getImages/setChoice', req)
      .then(res => res.json())
        .then(data => console.log(data));
    this.setState({
      selected: true
    });
    data.value = null;
  }

  getAvailableSets = () => {
    fetch(process.env.REACT_APP_API + '/getImages/getSets')
      .then(res => res.json())
        .then(data => {
          data.sets.forEach(element => {
            this.state.sets.push(element);
          });
        })
          .catch(err => console.log(err));
    console.log(this.state.sets);
    this.setState({
      processed: true
    })
  }



  handleReset = async e => {
    await fetch(process.env.REACT_APP_API + '/getImages/reset')
      .then(res => res.text())
        .then(res => console.log(JSON.parse(res).message))
          .catch(err => console.log(err));
      this.setState({
        sets: [],
        selected: false,
        processed: false
      }, this.getAvailableSets);
    }
  
  componentWillUnmount() {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: this.state.name })
    };
    fetch(process.env.REACT_APP_API + '/getImages/removePlayer', req)
    .then(res => res.text())
      .then(res => console.log(res))
        .catch(err => console.log(err));
  }

    setName = (event, data) => {
      this.setState({
        name: data.value
      });
    }

    getOpponents = () => {
      if (!this.state.oppChosen) {
        let others = [];
        fetch(process.env.REACT_APP_API + '/getImages/getOpponents')
        .then(res => res.json())
          .then(data => {
            data.opponents.forEach(element => {
              others.push({key: element, text: element, value: element});
            });
            if (others !== this.state.opps) {
              this.setState({
                new: false
              }, function() {
                this.setState({
                  opp: others,
                  new: true
                })}
                );
            }
          })
      }
    }

    sendName = () => {
      console.log(this.state.name);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: this.state.name })
      };
      fetch(process.env.REACT_APP_API + '/getImages/addName', req)
      .then(res => res.text())
        .then(res => JSON.parse(res))
          .then(res => {
              console.log(res.success);
              // this.props.setGameId(res.id);
          })
          .catch(err => console.log(err));
      this.setState({
        nameSet: true
      });
      clearInterval(this.refreshInterval);
      console.log("Set interval");
      this.refreshOpp = setInterval(
        this.joinedGame,
        REFRESH_EVERY_MS
      );
  
      this.joinedGame();
    }

    startGame = (event, data) => {
      this.setState({
        opponent: data.value,
        oppChosen: true
      })
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          player: this.state.name,
          opponent: data.value
         })
      };
      fetch(process.env.REACT_APP_API + '/getImages/joinGame', req)
      .then(res => res.text())
        .then(res => JSON.parse(res))
          .then(res => {
            console.log(res.success);
            this.setState({
              gameId: res.id
            })
            this.props.setGameId(res.id);
          })
          .catch(err => console.log(err));
      this.setPlayers();
    }

    setPlayers = () => {
      this.setState({
        playerSet: true
      });
    }

    joinedGame = () => {
      console.log("Checkgame");
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          player: this.state.name
         })
      };
      fetch(process.env.REACT_APP_API + '/getImages/gameJoined', req)
      .then(res => res.text())
        .then(res => JSON.parse(res))
          .then(res => {
            let op = res.opponent;
              console.log(op)
              if (op !== '') {
                clearInterval(this.refreshOpp);
                this.setState({
                  oppChosen: true,
                  opponent: op,
                  gameId: res.id
                }, this.setPlayers);
                this.props.setGameId(res.id);
              }
          })
          .catch(err => console.log(err));
      
    }

  render() {

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
          <Grid.Column width={8}>
            <Segment raised padded>
              <Header as='h1' textAlign='center' color='blue'>Guess Who</Header>
            </Segment>
          </Grid.Column>
          {this.state.playerSet ?(
          <Grid.Column width={2}>
            <Segment>
              <Grid  columns={2} stackable textAlign='center'>
                <Divider vertical>vs</Divider>
                <Grid.Column>
                  {this.state.name}
                </Grid.Column>
                <Grid.Column>
                  {this.state.opponent}
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
          ) : (
            <>
          <Grid.Column width={2}>
            <Input
              label='Name'
              onChange={this.setName} />
              {!this.state.nameSet &&(
            <Button
              disabled={(this.state.name === '')}
              onClick={this.sendName}>Start Game</Button>)}
          </Grid.Column>
          <Grid.Column width={2}>
            {this.state.new && (
            <Dropdown
              id="opponent"
              disabled={(this.state.name === '' || this.state.nameSet)}
              fluid
              selection
              options={this.state.opp}
              onChange={this.startGame}
              />)}
          </Grid.Column>
          </>
          )}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              {this.state.processed && (
              <Dropdown
                id="selector" 
                placeholder='Select Character Set'
                fluid
                search
                selection
                options={this.state.sets}
                onChange={this.choose}
                />)}
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Reset</Button>
            </Grid.Column>
            <Grid.Column width={8}>
                <Upload 
                  sets={this.state.sets}
                  handleReset={this.handleReset}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
