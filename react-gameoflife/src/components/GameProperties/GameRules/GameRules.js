import React from 'react';

import classes from './GameRules.module.css';

const GameRules = (props) => {
    return(
        <div className={classes.GameRulesWrapper}>
            <h1>Rules</h1>
            <p>
            Every cell interacts with its eight neighbours (horizontally, vertically, or diagonally adjacent):
                <ul role="list">
                    <li>Any live cell with two or three live neighbours survives</li>
                    <li>Any dead cell with three live neighbours becomes a live cell</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ul> 
            </p>
        </div>
    ) 
}

export default GameRules;