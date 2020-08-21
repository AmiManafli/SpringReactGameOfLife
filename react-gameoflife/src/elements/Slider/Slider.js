import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import sliderClasses from './Slider.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
  
const PrettoSlider = withStyles({
    root: {
      color: '#b0aac0',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);



  export default function Test({onChangeHandler}) {
        const classes = useStyles();
        const [ value, setValue ] = useState(3);
        const onChange = (event, val) => {
            if (onChangeHandler) {
                onChangeHandler(val);
            }
        }
        return (
            <div className={sliderClasses.SliderWrapper}>
                <label>
                        Speed    
                    </label>
                <PrettoSlider 
                    value={value}
                    defaultValue={3}
                    step={0.5}
                    marks
                    min={1}
                    max={4.9}
                    valueLabelDisplay="auto"
                    onChange={(event, val) => setValue(val)}
                    onChangeCommitted={onChange}/>
            </div>
          
        );
  }