import React from 'react';

import classes from './ButtonGroup.module.css';

class ButtonGroup extends React.Component {
    render() {
        const {clicked} = this.props;
        return (
            <div class={classes.BtnGroup}>
                <button type="submit" onClick={() => clicked(5)}>128x96</button>
                <button type="submit" onClick={() => clicked(10)}>64x48</button>
                <button type="submit" onClick={() => clicked(16)}>40x30</button>
                <button type="submit" onClick={() => clicked(20)}>32x24</button>
              </div> 
            )        
    }
}

export default ButtonGroup;