import React from 'react';

import classes from './Controls.module.css';
import Button from '../../../elements/Button/Button';
import Slider from '../../../elements/Slider/Slider';

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        const { sizeChangeHandler } = this.props;
        return (
            <div>
                <div className={classes.ControlButtonsWrapper}>
                    <Button type="submit" name="test" clicked={this.props.newMapHandler}>New Map</Button>
                    {this.props.isRunning ? 
                    <Button type="submit" name="test" clicked={this.props.stopHandler}>Stop</Button>   :
                    <Button type="submit" name="test" clicked={this.props.runHandler}>Run</Button>
                    }
                    <Button type="submit" name="test" clicked={this.props.clearHandler}>Clear</Button>    
                </div>
                <Slider onChangeHandler={this.props.speedChangeHandler}/> 
                <div className={classes.ControlButtonsWrapper}>
                    <Button type="submit" clicked={() => sizeChangeHandler(5)}>128x96</Button>
                    <Button type="submit" clicked={() => sizeChangeHandler(10)}>64x48</Button>
                    <Button type="submit" clicked={() => sizeChangeHandler(16)}>40x30</Button>
                    <Button type="submit" clicked={() => sizeChangeHandler(20)}>32x24</Button>

                </div>
            </div>
        )
    }
}

export default Controls;