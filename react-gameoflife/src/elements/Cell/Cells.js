import React from 'react';
import classes from './Cells.module.css';


// const CELL_SIZE = 10;

class Cell extends React.Component {  
    render() {    
        const { x, y, cellSize } = this.props;    

        return (      
            <div className={classes.Cell} style={{        
                left: `${cellSize * x + 1}px`,        
                top: `${cellSize * y + 1}px`,        
                width: `${cellSize - 1}px`,        
                height: `${cellSize - 1}px`,      
            }} />
        );  
    }
}

export default Cell;