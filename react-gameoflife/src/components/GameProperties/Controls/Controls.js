import React from 'react';

import classes from './Controls.module.css';
import Button from '../../../elements/Button/Button';
import Slider from '../../../elements/Slider/Slider';
import ButtonGroup from '../Controls/ButtonGroup/ButtonGroup';
import PropertiesPanel from '../PropertiesPanel';

const Controls = (props) => {
    return (
        <div>
            <PropertiesPanel>
            <h1 style={{textTransform: "uppercase", color: "#a0a0a0", alignSelf: "flex-start", padding: "7px", fontSize: "1.5rem"}}>Controls</h1>
            <div className={classes.ControlButtonsWrapper}>
                <Button type="submit" name="test" clicked={props.newMapHandler}>New Map</Button>
                {props.isRunning ? 
                <Button type="submit" name="test" clicked={props.stopHandler}>Stop</Button>   :
                <Button type="submit" name="test" clicked={props.runHandler}>Run</Button>
                }
                <Button type="submit" name="test" clicked={props.clearHandler}>Clear</Button>    
            </div>
            <Slider onChangeHandler={props.speedChangeHandler}/> 
            <ButtonGroup clicked={props.sizeChangeHandler}/>
            </PropertiesPanel>
        </div>
    )
}

export default Controls;