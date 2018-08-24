/* eslint-env browser */
import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import KeyListener from './KeyListener';

class App extends Component {
  state = {game: {players:{}}}
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onmessage = (event) => {
      this.setState({game: JSON.parse(event.data)});
    }
    this.socket.onopen = () => {
      for(const dir of ['down', 'up', 'left', 'right']){
        this[dir] = () => {
          this.socket.send(JSON.stringify({type: 'simple-movement', data: dir}));
        }
      }
    }
  }

  render() {
    const onKeyDown = (event) => {
      event.preventDefault();
      switch(event.key){
        case 'ArrowDown': {
          this.down();
          break;
        }
        case 'ArrowUp': {
          this.up();
          break;
        }
        case 'ArrowLeft': {
          this.left();
          break;
        }
        case 'ArrowRight': {
          this.right();
          break;
        }
      }
    }
    const {players, me, treasures = []} = this.state.game;
    const playerCircles = Object.entries(players)
      .map(([key, player]) => <ellipse key={key} fill={player.name === me ? 'red' : 'blue'} cx={player.pos.x * 10 + 5} cy={player.pos.y * 10 + 5} rx={5 + player.money} ry={5 + player.money}/>)
    const treasureSquares = treasures.map(({x, y}) => (<rect fill='yellow' x={x * 10 + 1} y={y * 10 + 1} width="8" height="8"></rect>))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <svg width='500px' height='500px' style={{background: 'black'}}>
          {treasureSquares}
         {playerCircles}
        </svg>
        <KeyListener listener={onKeyDown}/>
      </div>
    );
  }
}

export default App;
