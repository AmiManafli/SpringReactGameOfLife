import React, { Component } from 'react'
import './App.css'
import Box from '@material-ui/core/Box';
import Header from '../components/Header/Header';
import Button from '../elements/Button/Button';
import GameBoard from '../components/GameBoard/GameBoard';
import Controls from '../components/GameProperties/Controls/Controls';
import PropertiesPanel from '../components/GameProperties/PropertiesPanel';
import classes from './App.css';


const WIDTH = 640;
const HEIGHT = 480;
//64x48
//5 8 10 12 16 20
class App extends Component {
  constructor() {
    super();
    this.cellSize = 10;
    this.rows = HEIGHT / this.cellSize;
    this.cols = WIDTH / this.cellSize;
    this.board = this.makeEmptyBoard();
    this.receiveMap = this.receiveMap.bind(this);
  }

  state = {
    cells: [],
    interval: 100,
    isRunning: false,
  }

    makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
        board[y] = [];
        for (let x = 0; x < this.cols; x++) {
            board[y][x] = false;
        }
    }
    return board;
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({x, y});
                }                
            }
        }
        return cells;
    }

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({cells: this.makeCells()});
    }

    async receiveMap() {
        const info = await fetch("http://localhost:8080/api/new-map")
                    .then((response) => { return response.json();});
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                this.board[i][j] = info[i][j];
            }
        }
        this.setState({ cells: this.makeCells() });
    }

    nextGeneration = async () => {
        const info = await fetch("http://localhost:8080/api/next-gen").then((response) => { return response.json();});
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                this.board[i][j] = info[i][j];
            }
        }
        this.setState({ cells: this.makeCells() });

        console.log(this.state.interval);
        window.clearTimeout(this.timeoutHandler);
        this.timeoutHandler = window.setTimeout(
            () => {this.nextGeneration();}, 
            this.state.interval);
    }

    updateBoardSize = async(param) => {
        this.stopGame();
        this.setNewCellSize(param);
        const newHeight = HEIGHT/param;
        const newWidth = WIDTH/param;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ width: newWidth, height: newHeight })
        };
        fetch('http://localhost:8080/api/set-board-size', requestOptions)
        .then(this.receiveMap);  
    }

    setNewCellSize = (cellSize) => {
        this.cellSize = cellSize;
        this.rows = HEIGHT / cellSize;
        this.cols = WIDTH / cellSize;
        this.board = this.makeEmptyBoard();
    }

    runGenerations = () => {
        this.setState({ isRunning: true });
        this.nextGeneration();
    }

    stopGame = () => {
        this.setState({ isRunning: false});
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    handleIntervalChange = (value) => {
        this.setState({ interval: 1000 / value});
    }



    render() {
    const { cells } = this.state;
    const gridStyle = {
        width: WIDTH,
        height: HEIGHT,
        backgroundSize: `${this.cellSize}px ${this.cellSize}px`,
    }
    return (
        <div className="App">
        <Header /> 
        <main className={classes.AppMain}>
        <Controls 
        isRunning={this.state.isRunning} 
        newMapHandler={this.receiveMap}
        runHandler={this.runGenerations}
        stopHandler={this.stopGame}
        clearHandler={this.handleClear}
        speedChangeHandler={this.handleIntervalChange}
        sizeChangeHandler={this.updateBoardSize}
        />

        <PropertiesPanel>
            <GameBoard  gridStyle={gridStyle} cells={cells} cellSize={this.cellSize}/>     
        </PropertiesPanel>
        </main>
        </div>
    )
    }
    }

export default App;
 //post: new map resolution