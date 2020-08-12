import React from 'react'

import classes from './Button.module.css';

const button = (props) => {
    return(
        <div className={classes.ButtonWrapper}>
            <button 
                type={props.type}
                name={props.name}
                onClick={props.clicked}>
                    {props.children}
                </button>
        </div>
    )
}

export default button;