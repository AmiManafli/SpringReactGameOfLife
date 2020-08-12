import React from 'react';
import Grid from '@material-ui/core/Grid';


import classes from './GameBoard.module.css';
import Cell from '../../elements/Cell/Cells';

class GameBoard extends React.Component {
    // constructor() {
    //     super();
    //     this.rows = HEIGHT / CELL_SIZE;
    //     this.cols = WIDTH / CELL_SIZE;
    //     this.board = this.makeEmptyBoard();
    //     this.receiveMap = this.receiveMap.bind(this);
    // }

    // state = {
    //     cells: [], 
    //     interval: 100,
    //     isRunning: false,
    // }

    // makeEmptyBoard() {
    //     let board = [];
    //     for (let y = 0; y < this.rows; y++) {
    //         board[y] = [];
    //         for (let x = 0; x < this.cols; x++) {
    //             board[y][x] = false;
    //         }
    //     }
    //     return board;
    // }

    // makeCells() {
    //     let cells = [];
    //     for (let y = 0; y < this.rows; y++) {
    //         for (let x = 0; x < this.cols; x++) {
    //             if (this.board[y][x]) {
    //                 cells.push({x, y});
    //             }                
    //         }
    //     }
    //     return cells;
    // }

    // handleClear = () => {
    //     this.board = this.makeEmptyBoard();
    //     this.setState({cells: this.makeCells()});
    // }

    // async receiveMap() {
    //     const info = await fetch("http://localhost:8080/api/new-map")
    //                 .then((response) => { return response.json();});
    //     for (let i = 0; i < info.length; i++) {
    //         for (let j = 0; j < info[i].length; j++) {
    //             this.board[i][j] = info[i][j];
    //         }
    //         this.setState({ cells: this.makeCells() });
    //     }
    // }

    // nextGeneration = async () => {
    //     const info = await fetch("http://localhost:8080/api/next-gen").then((response) => { return response.json();});
    //     for (let i = 0; i < info.length; i++) {
    //         for (let j = 0; j < info[i].length; j++) {
    //             this.board[i][j] = info[i][j];
    //         }
    //         this.setState({ cells: this.makeCells() });
    //     }

    //     this.timeoutHandler = window.setTimeout(
    //         () => {this.nextGeneration();}, 
    //         this.state.interval);
    // }

    // runGenerations = () => {
    //     this.setState({ isRunning: true });
    //     this.nextGeneration();
    // }

    // stopGame = () => {
    //     this.setState({ isRunning: false});
    //     if (this.timeoutHandler) {
    //         window.clearTimeout(this.timeoutHandler);
    //         this.timeoutHandler = null;
    //     }
    // }

    // handleIntervalChange = (event) => {
    //     this.setState({ interval: event.target.value });
    // }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={classes.GameBoard}
                    style={this.props.gridStyle}>
                        {this.props.cells.map(cell => (
                            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                        ))}
                </div>
            </div>
        );
    }
}

export default GameBoard;