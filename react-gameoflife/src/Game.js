import React from 'react';
import './Game.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {  
    render() {    
        const { x, y } = this.props;    
        return (      
            <div className="Cell" style={{        
                left: `${CELL_SIZE * x + 1}px`,        
                top: `${CELL_SIZE * y + 1}px`,        
                width: `${CELL_SIZE - 1}px`,        
                height: `${CELL_SIZE - 1}px`,      
            }} />
        );  
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();

        // this.handleClick = this.handleClick.bind(this);
        // this.makeEmptyBoard = this.makeEmptyBoard.bind(this);
        // this.makeCells = this.makeCells.bind(this);
        // this.getElementOffset = this.getElementOffset.bind(this);
        this.receiveMap = this.receiveMap.bind(this);
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbours = this.calculateNeighbours(this.board, x, y); 
                if (this.board[y][x]) {
                    if (neighbours === 2 || neighbours === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbours === 3) {
                        newBoard[y][x] = true;
                    }
                }               
            }
        }

        this.board = newBoard;
        this.setState({
            cells: this.makeCells()
        });
        this.timeoutHandler = window.setTimeout(
            () => {this.runIteration();}, 
            this.state.interval);
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false});
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
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
                if(this.board[y][x]) {
                    cells.push({x, y});
                }
            }
        }
        return cells;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        const testCells = this.makeCells();
        this.setState( {
            cells: testCells
        });
    }

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells()});
    }

    async receiveMap() {
        const info = await fetch("http://localhost:8080/api/new-map").then((response) => { return response.json();});
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                this.board[i][j] = info[i][j];
            }
            this.setState({ cells: this.makeCells() });
        }
    }

    nextGeneration = async () => {
        const info = await fetch("http://localhost:8080/api/next-gen").then((response) => { return response.json();});
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                this.board[i][j] = info[i][j];
            }
            this.setState({ cells: this.makeCells() });
        }

        this.timeoutHandler = window.setTimeout(
            () => {this.nextGeneration();}, 
            this.state.interval);
    }

    runGenerations = () => {
        this.setState({ isRunning: true });
        this.nextGeneration();
    }

    render() {
        const { cells } = this.state;
        const gridStyle = {
            width: WIDTH, 
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }

        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                    <div className="controls">
                        <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                    </div> 
                    <div>

                        <IconButton onClick={this.receiveMap}><AddCircleIcon fontSize="large"/>New Map</IconButton>
                        {this.state.isRunning ?
                            <IconButton onClick={this.stopGame}><StopIcon />Stop</IconButton> :
                            <IconButton onClick={this.runGenerations}><PlayArrowIcon fontSize="large"/>Run</IconButton>                             
                        }
                        <IconButton onClick={this.handleClear}><DeleteOutlineIcon fontSize="large"/>Clear</IconButton>
                    </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="Board"
                            style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                            onClick={this.handleClick}
                            ref={(n) => { this.boardRef = n; }}>

                            {cells.map(cell => (
                                <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                            ))}
                        </div>
                    </Grid>
                </Grid>
          </div>
        );
    }
}



export default Game;