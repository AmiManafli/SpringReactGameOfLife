import React from 'react';
import Grid from '@material-ui/core/Grid';


import classes from './GameBoard.module.css';
import Cell from '../../elements/Cell/Cells';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={classes.GameBoard}
                    style={this.props.gridStyle}>
                        {this.props.cells.map(cell => (
                            <Cell cellSize={this.props.cellSize} x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                        ))}
                </div>
            </div>
        );
    }
}

export default GameBoard;