import React from 'react';

import classes from './Controls.module.css';
import Button from '../../../elements/Button/Button';
import Slider from '../../../elements/Slider/Slider';

const controls = (props) => {
    return (
        <div>
            <div className={classes.ControlButtonsWrapper}>
                <Button type="submit" name="test" clicked={props.newMapHandler}>New Map</Button>
                {props.isRunning ? 
                <Button type="submit" name="test" clicked={props.stopHandler}>Stop</Button>   :
                <Button type="submit" name="test" clicked={props.runHandler}>Run</Button>
                }
                <Button type="submit" name="test" clicked={props.clearHandler}>Clear</Button>    
            </div>
            <Slider onChangeHandler={props.speedChangeHandler}/>
        </div>
    )
}

export default controls;